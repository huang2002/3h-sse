"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSEController = void 0;
const common_1 = require("./common");
const intervalAdaptor_1 = require("./intervalAdaptor");
const timeoutAdaptor_1 = require("./timeoutAdaptor");
/** dts2md break */
/**
 * Server-sent event controller class.
 */
class SSEController {
    /** dts2md break */
    /**
     * Constructor of {@link SSEController}.
     */
    constructor(options) {
        this.backendAdaptor = options?.backendAdaptor ?? null;
        this.pingText = options?.pingText ?? common_1.defaultPingText;
        this.pingInterval = options?.pingInterval ?? common_1.defaultPingInterval;
        this.smartPing = options?.smartPing ?? true;
        this.intervalAdaptor = options?.intervalAdaptor ?? intervalAdaptor_1.defaultIntervalAdaptor;
        this.timeoutAdaptor = options?.timeoutAdaptor ?? timeoutAdaptor_1.defaultTimeoutAdaptor;
        this.ping = this.ping.bind(this);
    }
    /** dts2md break */
    /**
     * Backend adaptor.
     */
    backendAdaptor;
    /** dts2md break */
    /**
     * Text used in pinging.
    */
    pingText;
    /** dts2md break */
    /**
     * Pinging interval in milliseconds.
     * (Non-positive value disables automatic pinging.)
    */
    pingInterval;
    /** dts2md break */
    /**
     * When enabled, the pinging timer got reset
     * when any content is sent.
     */
    smartPing;
    /** dts2md break */
    /**
     * Interval adaptor.
     */
    intervalAdaptor;
    /** dts2md break */
    /**
     * Timeout adaptor.
     */
    timeoutAdaptor;
    /** dts2md break */
    /**
     * Interval timer identity.
     */
    _intervalTimerId = common_1.NULL_TIMER_ID;
    /** dts2md break */
    /**
     * Timeout timer identity.
     */
    _timeoutTimerId = common_1.NULL_TIMER_ID;
    /** dts2md break */
    /**
     * Whether the SSE controller is running.
     */
    _isRunning = false;
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
        const { backendAdaptor } = this;
        if (!backendAdaptor) {
            throw new TypeError('backend adaptor not available');
        }
    }
    /** dts2md break */
    /**
     * Initialize the controller.
     */
    initialize() {
        const { backendAdaptor } = this;
        this.assertAdaptorAvailability();
        backendAdaptor.initialize();
    }
    /** dts2md break */
    /**
     * Clear pinging timer(s).
     */
    clearTimer() {
        if (!Object.is(this._intervalTimerId, common_1.NULL_TIMER_ID)) {
            this.intervalAdaptor.clearInterval(this._intervalTimerId);
            this._intervalTimerId = common_1.NULL_TIMER_ID;
        }
        if (!Object.is(this._timeoutTimerId, common_1.NULL_TIMER_ID)) {
            this.timeoutAdaptor.clearTimeout(this._timeoutTimerId);
            this._timeoutTimerId = common_1.NULL_TIMER_ID;
        }
    }
    /** dts2md break */
    /**
     * Initialize pinging timer.
     */
    startTimer() {
        if (this.smartPing) {
            this._timeoutTimerId = this.timeoutAdaptor.setTimeout(this.ping, this.pingInterval);
        }
        else {
            this._intervalTimerId = this.intervalAdaptor.setInterval(this.ping, this.pingInterval);
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
    sendVerbatim(content) {
        const { backendAdaptor } = this;
        this.assertAdaptorAvailability();
        backendAdaptor.send(content);
        if (this._isRunning && this.smartPing) {
            this.resetTimer();
        }
    }
    /** dts2md break */
    /**
     * Send an event with optional data.
     */
    sendEvent(eventName, data) {
        const { backendAdaptor } = this;
        this.assertAdaptorAvailability();
        backendAdaptor.send(`event: ${eventName}\n`);
        if (typeof data === 'string') {
            data.split('\n').forEach((line) => {
                backendAdaptor.send(`data: ${line}\n`);
            });
        }
        backendAdaptor.send('\n');
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
exports.SSEController = SSEController;
