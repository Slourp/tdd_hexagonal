import { EmptyMessageError, MessageTooLongError, WhiteSpacesMessageError } from "../../application/usecases/post-message.usecase";
import { ValidatorType } from "../validators/ValidatorType";

class ErrorFactory {
    static create(errorType: ValidatorType): Error {
        const errorMap = {
            [ValidatorType.EmptyMessage]: EmptyMessageError,
            [ValidatorType.WhiteSpacesMessage]: WhiteSpacesMessageError,
            [ValidatorType.MessageTooLong]: MessageTooLongError,
        };

        const ErrorClass = errorMap[errorType];

        if (ErrorClass) return new ErrorClass();

        throw new Error(`Invalid error type: ${errorType}`);
    }
}

export default ErrorFactory;
