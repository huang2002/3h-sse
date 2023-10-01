import { BackendAdaptor, NULL_TIMER_ID } from './common';
import { IntervalAdaptor } from './intervalAdaptor';
import { TimeoutAdaptor } from './timeoutAdaptor';
/**
 * Type of options of {@link SSEController}.
 */
export interface SSEControllerOptions<IntervalTimerId, TimeoutTimerId> {
    /**
     * Backend adaptor.
     * @default null
     */
    backendAdaptor?: BackendAdaptor | null;
    /**
     * Text used in pinging.
     * @default defaultPingText
     */
    pingText?: string;
    /**
     * Pinging interval in milliseconds.
     * (Non-positive value disables automatic pinging.)
     * @default defaultPingInterval
     */
    pingInterval?: number;
    /**
     * When enabled, the pinging timer got reset
     * when any content is sent.
     * @default true
     */
    smartPing?: boolean;
    /**
     * Interval adaptor.
     * @default defaultIntervalAdaptor
     */
    intervalAdaptor?: IntervalAdaptor<IntervalTimerId>;
    /**
     * Timeout adaptor.
     * @default defaultTimeoutAdaptor
    */
    timeoutAdaptor?: TimeoutAdaptor<TimeoutTimerId>;
}
/** dts2md break */
/**
 * Server-sent event controller class.
 */
export declare class SSEController<IntervalTimerId = any, TimeoutTimerId = any> {
    /** dts2md break */
    /**
     * Constructor of {@link SSEController}.
     */
    constructor(options?: SSEControllerOptions<IntervalTimerId, TimeoutTimerId>);
    /** dts2md break */
    /**
     * Backend adaptor.
     */
    backendAdaptor: BackendAdaptor | null;
    /** dts2md break */
    /**
     * Text used in pinging.
    */
    pingText: string;
    /** dts2md break */
    /**
     * Pinging interval in milliseconds.
     * (Non-positive value disables automatic pinging.)
    */
    pingInterval: number;
    /** dts2md break */
    /**
     * When enabled, the pinging timer got reset
     * when any content is sent.
     */
    smartPing: boolean;
    /** dts2md break */
    /**
     * Interval adaptor.
     */
    intervalAdaptor: IntervalAdaptor<IntervalTimerId>;
    /** dts2md break */
    /**
     * Timeout adaptor.
     */
    timeoutAdaptor: TimeoutAdaptor<TimeoutTimerId>;
    /** dts2md break */
    /**
     * Interval timer identity.
     */
    protected _intervalTimerId: IntervalTimerId | (typeof NULL_TIMER_ID);
    /** dts2md break */
    /**
     * Timeout timer identity.
     */
    protected _timeoutTimerId: TimeoutTimerId | (typeof NULL_TIMER_ID);
    /** dts2md break */
    /**
     * Whether the SSE controller is running.
     */
    protected _isRunning: boolean;
    /** dts2md break */
    /**
     * Whether the SSE controller is running.
     */
    get isRunning(): boolean;
    /** dts2md break */
    /**
     * Check adaptor availability
     * and throw an error if adaptor is not available.
     */
    assertAdaptorAvailability(): void;
    /** dts2md break */
    /**
     * Initialize the controller.
     */
    initialize(): void;
    /** dts2md break */
    /**
     * Clear pinging timer(s).
     */
    clearTimer(): void;
    /** dts2md break */
    /**
     * Initialize pinging timer.
     */
    startTimer(): void;
    /** dts2md break */
    /**
     * Reset pinging timer(s).
     */
    resetTimer(): void;
    /** dts2md break */
    /**
     * Send specific content as-is.
     */
    sendVerbatim(content: string): void;
    /** dts2md break */
    /**
     * Send an event with optional data.
     */
    sendEvent(eventName: string, data?: string): void;
    /** dts2md break */
    /**
     * Send a ping message.
     */
    ping(): void;
    /** dts2md break */
    /**
     * Start the SSE controller.
     */
    start(): void;
    /** dts2md break */
    /**
     * Stop the SSE controller.
     */
    stop(): void;
}
