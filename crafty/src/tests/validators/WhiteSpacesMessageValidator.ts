// WhiteSpacesMessageValidator.ts

import { Validator } from "../Validator";
import { WhiteSpacesMessageError } from "../post-message.usecase";


export class WhiteSpacesMessageValidator extends Validator {
    validate(value: string): void {
        if (value.trim() === "") throw new WhiteSpacesMessageError();
        if (this.nextValidator) this.nextValidator.validate(value);
    }
}
