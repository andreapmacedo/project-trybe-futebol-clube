class HttpException extends Error {
    // status: number;

    // constructor(status: number, message: string) {
    constructor(public status: number, message: string) {
        super(message);
        // this.status = status;
    }
}

export default HttpException;
