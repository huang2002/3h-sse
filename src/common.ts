/**
 * Type of HTTP headers.
 */
export type HTTPHeaders = Record<string, string>;
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
export const defaultHeaders: HTTPHeaders = {
    'Connection': 'keep-alive',
    'Cache-Control': 'no-store',
    'Content-Type': 'text/event-stream',
};
/** dts2md break */
/**
 * Default pinging text.
 * @default 'ping'
 */
export let defaultPingText = 'ping';
/** dts2md break */
/**
 * Default pinging interval. (in milliseconds)
 * @default 20_000
 */
export let defaultPingInterval = 20_000;
/** dts2md break */
/**
 * Placeholder for null timer identity.
 */
export const NULL_TIMER_ID = Object.create(null) as {};
/** dts2md break */
/**
 * Type of backend initializers.
 */
export type BackendInitializer = () => (void | Promise<void>);
/** dts2md break */
/**
 * Type of backend senders.
 */
export type BackendSender = (content: string) => (void | Promise<void>);
/** dts2md break */
/**
 * Type of backend adaptors.
 */
export interface BackendAdaptor {
    initialize: BackendInitializer;
    send: BackendSender;
}
