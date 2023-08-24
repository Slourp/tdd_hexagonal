import { Validator } from "../Validator";
import { MessageTooLongError } from "../post-message.usecase";

export class MessageTooLongValidator extends Validator {
    validate(value: string): void {
        if (value.length > 280) throw new MessageTooLongError();
        if (this.nextValidator) this.nextValidator.validate(value);
    }
}
