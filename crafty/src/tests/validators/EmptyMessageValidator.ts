// EmptyMessageValidator.ts

import { Validator } from "../Validator";
import { EmptyMessageError } from "../post-message.usecase";


export class EmptyMessageValidator extends Validator {
    validate(value: string): void {
        if (!value) throw new EmptyMessageError();
        if (this.nextValidator) this.nextValidator.validate(value);
    }
}
