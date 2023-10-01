"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTimeoutAdaptor = void 0;
/** dts2md break */
/**
 * Default timeout adaptor.
 * @default
 * ```js
 * // builtin `setTimeout` & `clearTimeout`
 * { setTimeout, clearTimeout }
 * ```
 */
exports.defaultTimeoutAdaptor = {
    setTimeout,
    clearTimeout,
};
