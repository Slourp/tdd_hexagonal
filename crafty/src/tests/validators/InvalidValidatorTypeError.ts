class InvalidValidatorTypeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidValidatorTypeError";
    }
}

export default InvalidValidatorTypeError