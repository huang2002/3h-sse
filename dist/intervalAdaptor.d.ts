/**
 * Type of interval adaptors.
 */
export interface IntervalAdaptor<TimerId> {
    setInterval(callback: () => void, interval: number): TimerId;
    clearInterval(identity: TimerId): void;
}
/** dts2md break */
/**
 * Default interval adaptor.
 * @default
 * ```js
 * // builtin `setInterval` & `clearInterval`
 * { setInterval, clearInterval }
 * ```
 */
export declare let defaultIntervalAdaptor: IntervalAdaptor<any>;
