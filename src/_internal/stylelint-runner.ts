/**
 * @packageDocumentation
 * Synchronous facade over Stylelint's async Node API using a dedicated worker.
 */
import {
    MessageChannel,
    Worker,
    receiveMessageOnPort,
} from "node:worker_threads";

import type {
    SerializableStylelintLintOptions,
    SerializableStylelintResult,
    StylelintWorkerResponse,
} from "./stylelint-worker-types.js";

const WAIT_TIMEOUT_IN_MILLISECONDS = 30_000 as const;
const WORKER_DONE_STATE = 1 as const;

const lintResultCache = new Map<string, SerializableStylelintResult>();

let stylelintWorker: Worker | undefined;

const createWorker = (): Worker =>
    new Worker(new URL("./stylelint-worker.js", import.meta.url), {
        name: "stylelint-eslint-bridge",
    });

const resetWorker = (): void => {
    if (stylelintWorker === undefined) {
        return;
    }

    void stylelintWorker.terminate();
    stylelintWorker = undefined;
};

const getWorker = (): Worker => {
    if (stylelintWorker === undefined) {
        stylelintWorker = createWorker();
        stylelintWorker.once("exit", () => {
            stylelintWorker = undefined;
        });
    }

    return stylelintWorker;
};

const createCacheKey = (options: SerializableStylelintLintOptions): string =>
    JSON.stringify(options);

const readWorkerResponse = (
    response: StylelintWorkerResponse | undefined
): SerializableStylelintResult => {
    if (response === undefined) {
        throw new Error(
            "Stylelint worker finished without returning a response."
        );
    }

    if (response.ok) {
        return response.result;
    }

    const error = new Error(response.error.message);
    error.name = response.error.name;

    if (response.error.stack !== undefined) {
        error.stack = response.error.stack;
    }

    throw error;
};

/** Run Stylelint synchronously for one source string. */
export const runStylelintSynchronously = (
    options: SerializableStylelintLintOptions
): SerializableStylelintResult => {
    const cacheKey = createCacheKey(options);
    const cachedResult = lintResultCache.get(cacheKey);

    if (cachedResult !== undefined) {
        return cachedResult;
    }

    const worker = getWorker();
    const signalBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
    const signal = new Int32Array(signalBuffer);
    const { port1, port2 } = new MessageChannel();

    worker.postMessage(
        {
            options,
            port: port2,
            signalBuffer,
        },
        [port2]
    );

    const waitResult = Atomics.wait(signal, 0, 0, WAIT_TIMEOUT_IN_MILLISECONDS);

    if (waitResult === "timed-out") {
        port1.close();
        resetWorker();
        throw new Error(
            "Timed out while waiting for the Stylelint worker to finish."
        );
    }

    if (Atomics.load(signal, 0) !== WORKER_DONE_STATE) {
        port1.close();
        throw new Error("Stylelint worker did not enter a completed state.");
    }

    const workerMessage = receiveMessageOnPort(port1);
    port1.close();

    const result = readWorkerResponse(
        workerMessage?.message as StylelintWorkerResponse | undefined
    );

    lintResultCache.set(cacheKey, result);

    return result;
};
