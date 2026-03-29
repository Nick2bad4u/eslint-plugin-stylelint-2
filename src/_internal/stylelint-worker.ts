/**
 * @packageDocumentation
 * Dedicated worker that runs Stylelint's async Node API for sync ESLint rule consumers.
 */
import { isMainThread, parentPort } from "node:worker_threads";

import stylelint from "stylelint";

import type {
    SerializableStylelintParseError,
    SerializableStylelintResult,
    SerializableStylelintWarning,
    StylelintWorkerRequest,
    StylelintWorkerResponse,
} from "./stylelint-worker-types.js";

const DONE_STATE = 1 as const;

const toSerializableWarning = (
    warning: stylelint.Warning
): SerializableStylelintWarning => ({
    column: warning.column,
    ...(warning.endColumn === undefined
        ? {}
        : { endColumn: warning.endColumn }),
    ...(warning.endLine === undefined ? {} : { endLine: warning.endLine }),
    ...(warning.fix === undefined ? {} : { fix: warning.fix }),
    line: warning.line,
    rule: warning.rule,
    severity: warning.severity,
    text: warning.text,
    ...(warning.url === undefined ? {} : { url: warning.url }),
});

const toSerializableParseError = (
    parseError: stylelint.LintResult["parseErrors"][number]
): SerializableStylelintParseError => ({
    column: parseError.column,
    ...(parseError.endColumn === undefined
        ? {}
        : { endColumn: parseError.endColumn }),
    ...(parseError.endLine === undefined
        ? {}
        : { endLine: parseError.endLine }),
    line: parseError.line,
    message: parseError.text,
    rule: "CssSyntaxError",
});

const toSerializableResult = (
    result: stylelint.LinterResult
): SerializableStylelintResult => {
    const firstResult = result.results[0];

    return {
        deprecations:
            firstResult?.deprecations.map((entry) => entry.text) ?? [],
        invalidOptionWarnings:
            firstResult?.invalidOptionWarnings.map((entry) => entry.text) ?? [],
        parseErrors:
            firstResult?.parseErrors.map(toSerializableParseError) ?? [],
        report: result.report,
        warnings: firstResult?.warnings.map(toSerializableWarning) ?? [],
    };
};

const notifyCompletion = (
    request: StylelintWorkerRequest,
    response: StylelintWorkerResponse
): void => {
    request.port.postMessage(response);
    request.port.close();

    const signal = new Int32Array(request.signalBuffer);
    Atomics.store(signal, 0, DONE_STATE);
    Atomics.notify(signal, 0);
};

const handleRequest = async (
    request: StylelintWorkerRequest
): Promise<void> => {
    try {
        const lintResult = await stylelint.lint({
            code: request.options.code,
            codeFilename: request.options.codeFilename,
            computeEditInfo: true,
            ...(request.options.allowEmptyInput === undefined
                ? {}
                : { allowEmptyInput: request.options.allowEmptyInput }),
            ...(request.options.configBasedir === undefined
                ? {}
                : { configBasedir: request.options.configBasedir }),
            ...(request.options.configFile === undefined
                ? {}
                : { configFile: request.options.configFile }),
            ...(request.options.cwd === undefined
                ? {}
                : { cwd: request.options.cwd }),
            ...(request.options.customSyntax === undefined
                ? {}
                : { customSyntax: request.options.customSyntax }),
            ...(request.options.quiet === undefined
                ? {}
                : { quiet: request.options.quiet }),
        });

        notifyCompletion(request, {
            ok: true,
            result: toSerializableResult(lintResult),
        });
    } catch (error: unknown) {
        const normalizedError =
            error instanceof Error
                ? {
                      message: error.message,
                      name: error.name,
                      ...(error.stack === undefined
                          ? {}
                          : { stack: error.stack }),
                  }
                : {
                      message: `Unknown Stylelint worker failure: ${String(error)}`,
                      name: "StylelintWorkerError",
                  };

        notifyCompletion(request, {
            error: normalizedError,
            ok: false,
        });
    }
};

if (!isMainThread) {
    parentPort?.on("message", (request: StylelintWorkerRequest) => {
        void handleRequest(request);
    });
}
