import { IValidator } from "./IValidator";

export abstract class Validator implements IValidator {
    protected nextValidator?: Validator;

    public setNext(validator: Validator): Validator {
        this.nextValidator = validator;
        return validator;
    }

    public abstract validate(value: string): void;
}
