import { Validator } from "./Validator";
import ValidatorType from "./validators/ValidatorType";

interface IFactory {
    create(validatorType: ValidatorType): Validator;
}

export default IFactory