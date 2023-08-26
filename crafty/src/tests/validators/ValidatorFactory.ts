import { Validator } from "../Validator";
import InvalidValidatorTypeError from "./InvalidValidatorTypeError";
import { EmptyMessageValidator } from "./EmptyMessageValidator";
import { MessageTooLongValidator } from "./MessageTooLongValidator";
import { WhiteSpacesMessageValidator } from "./WhiteSpacesMessageValidator";
import { ValidatorType } from "./ValidatorType";

class ValidatorFactory {
    static create(validatorType: ValidatorType): Validator {
        const validatorMap = {
            [ValidatorType.EmptyMessage]: EmptyMessageValidator,
            [ValidatorType.WhiteSpacesMessage]: WhiteSpacesMessageValidator,
            [ValidatorType.MessageTooLong]: MessageTooLongValidator,
        };

        const ValidatorClass = validatorMap[validatorType];

        if (ValidatorClass) return new ValidatorClass();

        throw new InvalidValidatorTypeError(`Invalid validator type: ${validatorType}`);
    }
}

export default ValidatorFactory;