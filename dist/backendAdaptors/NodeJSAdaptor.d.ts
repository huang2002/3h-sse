import { BackendAdaptor, HTTPHeaders } from '../common';
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
 * Type of options of {@link NodeJSAdaptor}.
 */
export interface NodeJSAdaptorOptions<ResponseType extends NodeJSResponseLike> {
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
export declare class NodeJSAdaptor<ResponseType extends NodeJSResponseLike = NodeJSResponseLike> implements BackendAdaptor {
    /** dts2md break */
    /**
     * Constructor of {@link NodeJSAdaptor}.
     */
    constructor(options?: NodeJSAdaptorOptions<ResponseType>);
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
    addResponse(response: ResponseType): void;
    /** dts2md break */
    /**
     * Initialize a single response.
     */
    initializeResponse(response: ResponseType): void;
    /** dts2md break */
    /**
     * Initialize responses.
     */
    initialize(): void;
    /** dts2md break */
    /**
     * Send content using `response.write()`.
     */
    send(content: string): void;
    /** dts2md break */
    /**
     * End all responses and clear `this.responses`.
     */
    clear(): void;
}
