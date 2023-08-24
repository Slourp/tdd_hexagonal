import { Validator } from "../Validator";
import InvalidValidatorTypeError from "./InvalidValidatorTypeError";
import { EmptyMessageValidator } from "./EmptyMessageValidator";
import { MessageTooLongValidator } from "./MessageTooLongValidator";
import ValidatorType from "./ValidatorType";
import { WhiteSpacesMessageValidator } from "./WhiteSpacesMessageValidator";

class ValidatorFactory {
    private static validatorMap: Record<ValidatorType, new () => Validator> = {
        [ValidatorType.EmptyMessage]: EmptyMessageValidator,
        [ValidatorType.WhiteSpacesMessage]: WhiteSpacesMessageValidator,
        [ValidatorType.MessageTooLong]: MessageTooLongValidator,
    };

    static create(validatorType: ValidatorType): Validator {
        const ValidatorClass = ValidatorFactory.validatorMap[validatorType];
        if (ValidatorClass) return new ValidatorClass();

        throw new InvalidValidatorTypeError(`Invalid validator type: ${validatorType}`);
    }
}

export default ValidatorFactory;
