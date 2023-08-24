import { WhiteSpacesMessageError, MessageTooLongError, EmptyMessageError } from "../post-message.usecase";
import ValidatorType from "../validators/ValidatorType";

class ErrorFactory {
    private static errorMap: Record<ValidatorType, new () => Error> = {
        [ValidatorType.EmptyMessage]: EmptyMessageError,
        [ValidatorType.WhiteSpacesMessage]: WhiteSpacesMessageError,
        [ValidatorType.MessageTooLong]: MessageTooLongError,
    };

    static create(errorType: ValidatorType): Error {
        const ErrorClass = ErrorFactory.errorMap[errorType];
        if (ErrorClass) return new ErrorClass();

        throw new Error(`Invalid error type: ${errorType}`);
    }
}

export default ErrorFactory;
