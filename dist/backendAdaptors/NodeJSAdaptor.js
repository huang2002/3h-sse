"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeJSAdaptor = void 0;
const common_1 = require("../common");
/** dts2md break */
/**
 * Class of NodeJS response adaptors.
 */
class NodeJSAdaptor {
    /** dts2md break */
    /**
     * Constructor of {@link NodeJSAdaptor}.
     */
    constructor(options) {
        this.responses = new Set(options?.responses);
        this.headers = options?.headers ?? common_1.defaultHeaders;
    }
    /** dts2md break */
    /**
     * Response objects.
     */
    responses;
    /** dts2md break */
    /**
     * HTTP headers used in initialization.
     */
    headers;
    /** dts2md break */
    /**
     * Add a response and initialize it.
     */
    addResponse(response) {
        this.responses.add(response);
        this.initializeResponse(response);
    }
    /** dts2md break */
    /**
     * Initialize a single response.
     */
    initializeResponse(response) {
        const { headers } = this;
        for (const [key, value] of Object.entries(headers)) {
            response.setHeader(key, value);
        }
    }
    /** dts2md break */
    /**
     * Initialize responses.
     */
    initialize() {
        for (const response of this.responses) {
            this.initializeResponse(response);
        }
    }
    /** dts2md break */
    /**
     * Send content using `response.write()`.
     */
    send(content) {
        for (const response of this.responses) {
            response.write(content);
        }
    }
    /** dts2md break */
    /**
     * End all responses and clear `this.responses`.
     */
    clear() {
        for (const response of this.responses) {
            response.end();
        }
        this.responses.clear();
    }
}
exports.NodeJSAdaptor = NodeJSAdaptor;
