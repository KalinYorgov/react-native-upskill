export class ServerUnavailableException extends Error {
    constructor(
        message = 'Server is currently unavailable. Please try again later.',
        options?: { cause?: Error }
    ) {
        // @ts-expect-error Error constructor accepts options parameter in runtime
        super(message, options);
        this.name = 'ServerUnavailableException';
    }
}

export class UnexpectedException extends Error {
    constructor(
        message = 'An unexpected error occurred',
        options?: { cause?: Error }
    ) {
        // @ts-expect-error Error constructor accepts options parameter in runtime
        super(message, options);
        this.name = 'UnexpectedException';
    }
}
