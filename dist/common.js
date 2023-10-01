"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NULL_TIMER_ID = exports.defaultPingInterval = exports.defaultPingText = exports.defaultHeaders = void 0;
/** dts2md break */
/**
 * Default HTTP headers used in server-sent events.
 * @default
 * ```txt
 * Connection: keep-alive
 * Cache-Control: no-store
 * Content-Type: text/event-stream
 * ```
 */
exports.defaultHeaders = {
    'Connection': 'keep-alive',
    'Cache-Control': 'no-store',
    'Content-Type': 'text/event-stream',
};
/** dts2md break */
/**
 * Default pinging text.
 * @default 'ping'
 */
exports.defaultPingText = 'ping';
/** dts2md break */
/**
 * Default pinging interval. (in milliseconds)
 * @default 20_000
 */
exports.defaultPingInterval = 20_000;
/** dts2md break */
/**
 * Placeholder for null timer identity.
 */
exports.NULL_TIMER_ID = Object.create(null);
