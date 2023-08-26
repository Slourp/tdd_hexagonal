import ErrorFactory from "../Error/ErrorFactory";
import { Validator } from "../Validator";
import { ValidatorType } from "./ValidatorType";

export class MessageTooLongValidator extends Validator {
    validate(value: string): void {
        if (value.length > 280) throw ErrorFactory.create(ValidatorType.MessageTooLong);
        if (this.nextValidator) this.nextValidator.validate(value);
    }
}
