/**
 * @packageDocumentation
 * Serializable contracts shared between the Stylelint worker and its sync client.
 */
import type { MessagePort } from "node:worker_threads";

import type stylelint from "stylelint";

/** Rule option subset forwarded to Stylelint's Node API. */
export type SerializableStylelintLintOptions = Readonly<{
    allowEmptyInput?: boolean;
    code: string;
    codeFilename: string;
    configBasedir?: string;
    configFile?: string;
    cwd?: string;
    customSyntax?: string;
    quiet?: boolean;
}>;

/** Minimal serializable warning payload returned to the ESLint rule. */
export type SerializableStylelintWarning = Readonly<{
    column: number;
    endColumn?: number;
    endLine?: number;
    fix?: stylelint.EditInfo;
    line: number;
    rule: string;
    severity: stylelint.Severity;
    text: string;
    url?: string;
}>;

/** Minimal serializable parse-error payload returned to the ESLint rule. */
export type SerializableStylelintParseError = Readonly<{
    column: number;
    endColumn?: number;
    endLine?: number;
    line: number;
    message: string;
    rule: "CssSyntaxError";
}>;

/** Minimal result payload returned from the worker. */
export type SerializableStylelintResult = Readonly<{
    deprecations: readonly string[];
    invalidOptionWarnings: readonly string[];
    parseErrors: readonly SerializableStylelintParseError[];
    report: string;
    warnings: readonly SerializableStylelintWarning[];
}>;

/** Request posted from the main thread to the worker. */
export type StylelintWorkerRequest = Readonly<{
    options: SerializableStylelintLintOptions;
    port: MessagePort;
    signalBuffer: SharedArrayBuffer;
}>;

/** Success response posted from the worker. */
export type StylelintWorkerSuccessResponse = Readonly<{
    ok: true;
    result: SerializableStylelintResult;
}>;

/** Failure response posted from the worker. */
export type StylelintWorkerErrorResponse = Readonly<{
    error: Readonly<{
        message: string;
        name: string;
        stack?: string;
    }>;
    ok: false;
}>;

/** Worker response union used by the sync client. */
export type StylelintWorkerResponse =
    | StylelintWorkerErrorResponse
    | StylelintWorkerSuccessResponse;
