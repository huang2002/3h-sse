import { BackendAdaptor, NULL_TIMER_ID, defaultPingInterval, defaultPingText } from './common';
import { IntervalAdaptor, defaultIntervalAdaptor } from './intervalAdaptor';
import { TimeoutAdaptor, defaultTimeoutAdaptor } from './timeoutAdaptor';

/**
 * Type of options of {@link SSEController}.
 */
export interface SSEControllerOptions<
    BackendType extends BackendAdaptor,
    IntervalTimerId,
    TimeoutTimerId,
> {
    /**
     * Backend adaptor.
     * @default null
     */
    backend?: BackendType | null;
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
export class SSEController<
    BackendType extends BackendAdaptor = BackendAdaptor,
    IntervalTimerId = any,
    TimeoutTimerId = any,
> {
    /** dts2md break */
    /**
     * Constructor of {@link SSEController}.
     */
    constructor(
        options?: SSEControllerOptions<
            BackendType,
            IntervalTimerId,
            TimeoutTimerId
        >,
    ) {
        this.backend = options?.backend ?? null;
        this.pingText = options?.pingText ?? defaultPingText;
        this.pingInterval = options?.pingInterval ?? defaultPingInterval;
        this.smartPing = options?.smartPing ?? true;
        this.intervalAdaptor = options?.intervalAdaptor ?? defaultIntervalAdaptor;
        this.timeoutAdaptor = options?.timeoutAdaptor ?? defaultTimeoutAdaptor;
        this.ping = this.ping.bind(this);
    }
    /** dts2md break */
    /**
     * Backend adaptor.
     */
    backend: BackendType | null;
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
    protected _intervalTimerId: IntervalTimerId | (typeof NULL_TIMER_ID) = NULL_TIMER_ID;
    /** dts2md break */
    /**
     * Timeout timer identity.
     */
    protected _timeoutTimerId: TimeoutTimerId | (typeof NULL_TIMER_ID) = NULL_TIMER_ID;
    /** dts2md break */
    /**
     * Whether the SSE controller is running.
     */
    protected _isRunning = false;
    /** dts2md break */
    /**
     * Whether the SSE controller is running.
     */
    get isRunning() {
        return this._isRunning;
    }
    /** dts2md break */
    /**
     * Check adaptor availability
     * and throw an error if adaptor is not available.
     */
    assertAdaptorAvailability() {
        const { backend: backendAdaptor } = this;
        if (!backendAdaptor) {
            throw new TypeError('backend adaptor not available');
        }
    }
    /** dts2md break */
    /**
     * Initialize the controller.
     */
    initialize() {
        const { backend: backendAdaptor } = this;
        this.assertAdaptorAvailability();
        backendAdaptor!.initialize();
    }
    /** dts2md break */
    /**
     * Clear pinging timer(s).
     */
    clearTimer() {
        if (!Object.is(this._intervalTimerId, NULL_TIMER_ID)) {
            this.intervalAdaptor.clearInterval(
                this._intervalTimerId as IntervalTimerId
            );
            this._intervalTimerId = NULL_TIMER_ID;
        }
        if (!Object.is(this._timeoutTimerId, NULL_TIMER_ID)) {
            this.timeoutAdaptor.clearTimeout(
                this._timeoutTimerId as TimeoutTimerId
            );
            this._timeoutTimerId = NULL_TIMER_ID;
        }
    }
    /** dts2md break */
    /**
     * Initialize pinging timer.
     */
    startTimer() {
        if (this.smartPing) {
            this._timeoutTimerId = this.timeoutAdaptor.setTimeout(
                this.ping,
                this.pingInterval
            );
        } else {
            this._intervalTimerId = this.intervalAdaptor.setInterval(
                this.ping,
                this.pingInterval
            );
        }
    }
    /** dts2md break */
    /**
     * Reset pinging timer(s).
     */
    resetTimer() {
        this.clearTimer();
        this.startTimer();
    }
    /** dts2md break */
    /**
     * Send specific content as-is.
     */
    sendVerbatim(content: string) {
        const { backend: backendAdaptor } = this;
        this.assertAdaptorAvailability();
        backendAdaptor!.send(content);
        if (this._isRunning && this.smartPing) {
            this.resetTimer();
        }
    }
    /** dts2md break */
    /**
     * Send an event with optional data.
     */
    sendEvent(eventName: string, data?: string) {

        const { backend: backendAdaptor } = this;
        this.assertAdaptorAvailability();

        backendAdaptor!.send(`event: ${eventName}\n`);

        if (typeof data === 'string') {
            data.split('\n').forEach((line) => {
                backendAdaptor!.send(`data: ${line}\n`);
            });
        }

        backendAdaptor!.send('\n');

        if (this._isRunning && this.smartPing) {
            this.resetTimer();
        }

    }
    /** dts2md break */
    /**
     * Send a ping message.
     */
    ping() {
        this.sendVerbatim(`:${this.pingText}\n`);
        if (this._isRunning && this.smartPing) {
            this.resetTimer();
        }
    }
    /** dts2md break */
    /**
     * Start the SSE controller.
     */
    start() {
        if (this._isRunning) {
            return;
        }
        this._isRunning = true;
        this.initialize();
        this.startTimer();
    }
    /** dts2md break */
    /**
     * Stop the SSE controller.
     */
    stop() {
        if (!this._isRunning) {
            return;
        }
        this.clearTimer();
        this._isRunning = false;
    }
}
