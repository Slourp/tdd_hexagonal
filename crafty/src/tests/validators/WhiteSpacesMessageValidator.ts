import ErrorFactory from "../Error/ErrorFactory";
import { Validator } from "../Validator";
import ValidatorType from "./ValidatorType";
export class WhiteSpacesMessageValidator extends Validator {
    validate(value: string): void {
        if (value.trim() === "") throw ErrorFactory.create(ValidatorType.WhiteSpacesMessage);
        if (this.nextValidator) this.nextValidator.validate(value);
    }
}
