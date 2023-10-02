import { BackendAdaptor, HTTPHeaders, defaultHeaders } from '../common';

/**
 * Type of NodeJS-like response objects.
 */
export interface NodeJSResponseLike {
    setHeader(key: string, value: string): void;
    write(content: string): void;
    end(): void;
}
/** dts2md break */
/**
 * Type of options of {@link NodeJSBackend}.
 */
export interface NodeJSBackendOptions<ResponseType extends NodeJSResponseLike> {
    /**
     * Response objects.
     * @default []
     */
    responses?: Iterable<ResponseType>;
    /**
     * HTTP headers used in initialization.
     * @default defaultHeaders
     */
    headers?: HTTPHeaders;
}
/** dts2md break */
/**
 * Class of NodeJS response adaptors.
 */
export class NodeJSBackend<ResponseType extends NodeJSResponseLike = NodeJSResponseLike>
    implements BackendAdaptor {
    /** dts2md break */
    /**
     * Constructor of {@link NodeJSBackend}.
     */
    constructor(options?: NodeJSBackendOptions<ResponseType>) {
        this.responses = new Set(options?.responses);
        this.headers = options?.headers ?? defaultHeaders;
    }
    /** dts2md break */
    /**
     * Response objects.
     */
    responses: Set<ResponseType>;
    /** dts2md break */
    /**
     * HTTP headers used in initialization.
     */
    headers: HTTPHeaders;
    /** dts2md break */
    /**
     * Add a response and initialize it.
     */
    addResponse(response: ResponseType) {
        this.responses.add(response);
        this.initializeResponse(response);
    }
    /** dts2md break */
    /**
     * Initialize a single response.
     */
    initializeResponse(response: ResponseType) {
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
    send(content: string) {
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
