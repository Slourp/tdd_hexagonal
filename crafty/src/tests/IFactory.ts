import { Validator } from "./Validator";
interface IFactory {
    create(validatorType: any): Validator;
}

export default IFactory