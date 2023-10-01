/**
 * Type of timeout adaptors.
 */
export interface TimeoutAdaptor<TimerId> {
    setTimeout(callback: () => void, timeout: number): TimerId;
    clearTimeout(identity: TimerId): void;
}
/** dts2md break */
/**
 * Default timeout adaptor.
 * @default
 * ```js
 * // builtin `setTimeout` & `clearTimeout`
 * { setTimeout, clearTimeout }
 * ```
 */
export let defaultTimeoutAdaptor: TimeoutAdaptor<any> = {
    setTimeout,
    clearTimeout,
};
