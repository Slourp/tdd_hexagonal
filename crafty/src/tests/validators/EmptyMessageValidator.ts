// EmptyMessageValidator.ts

import ErrorFactory from "../Error/ErrorFactory";
import { Validator } from "../Validator";
import ValidatorType from "./ValidatorType";

export class EmptyMessageValidator extends Validator {
    validate(value: string): void {
        if (!value) throw ErrorFactory.create(ValidatorType.EmptyMessage);
        if (this.nextValidator) this.nextValidator.validate(value);
    }
}
