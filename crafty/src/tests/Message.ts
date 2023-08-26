
import ValidatorFactory from "./validators/ValidatorFactory";
import { ValidatorType } from "./validators/ValidatorType";
export type SerializedMessageData = {
  id: string;
  text: string;
  author: string;
  publishedAt: string;
};

class Message {
  private readonly _id: string;
  private readonly _text: MessageText;
  private readonly _author: string;
  private readonly _publishedAt: Date;

  constructor(id: string, text: MessageText, author: string, publishedAt: Date) {
    this._id = id;
    this._text = text;
    this._author = author;
    this._publishedAt = publishedAt;
  }

  get id(): string {
    return this._id;
  }

  get text(): string {
    return this._text.value;
  }

  get author(): string {
    return this._author;
  }

  get publishedAt(): Date {
    return this._publishedAt;
  }

  getData(): any {
    return {
      id: this._id,
      text: this._text.value,
      author: this._author,
      publishedAt: this._publishedAt.toISOString()
    };
  }

  static fromData(data: SerializedMessageData): Message {
    const id = data.id;
    const author = data.author;
    const publishedAt = new Date(data.publishedAt);

    return new Message(id, MessageText.of(data.text), author, publishedAt);
  }
}

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


