import { Validator } from "./Validator";
import {
  EmptyMessageError,
  MessageTooLongError,
  WhiteSpacesMessageError,
} from "./post-message.usecase";
import { EmptyMessageValidator } from "./validators/EmptyMessageValidator";
import { MessageTooLongValidator } from "./validators/MessageTooLongValidator";
import ValidatorFactory from "./validators/ValidatorFactory";
import ValidatorType from "./validators/ValidatorType";
import { WhiteSpacesMessageValidator } from "./validators/WhiteSpacesMessageValidator";

type Message = {
  id: string;
  text: MessageText;
  author: string;
  publishedAt: Date;
};

export default Message;




export class MessageText {
  private constructor(readonly value: string) { }

  public static of(value: string): MessageText {
    const emptyMessageValidator = ValidatorFactory.create(ValidatorType.EmptyMessage);
    const whiteSpacesMessageValidator = ValidatorFactory.create(ValidatorType.WhiteSpacesMessage);
    const messageTooLongValidator = ValidatorFactory.create(ValidatorType.MessageTooLong);

    emptyMessageValidator
      .setNext(whiteSpacesMessageValidator)
      .setNext(messageTooLongValidator);

    emptyMessageValidator.validate(value);

    return new MessageText(value);
  }
}


