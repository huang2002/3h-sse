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
export declare const defaultHeaders: HTTPHeaders;
/** dts2md break */
/**
 * Default pinging text.
 * @default 'ping'
 */
export declare let defaultPingText: string;
/** dts2md break */
/**
 * Default pinging interval. (in milliseconds)
 * @default 20_000
 */
export declare let defaultPingInterval: number;
/** dts2md break */
/**
 * Placeholder for null timer identity.
 */
export declare const NULL_TIMER_ID: {};
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
