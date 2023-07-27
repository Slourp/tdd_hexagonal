import {
  EmptyMessageError,
  MessageTooLongError,
  WhiteSpacesMessageError,
} from "./post-message.usecase";

type Message = {
  id: string;
  text: MessageText;
  author: string;
  publishedAt: Date;
};

export default Message;

export class MessageText {
  private constructor(readonly value: string) {}

  public static of(value: string): MessageText {
    if (!value) throw new EmptyMessageError();

    if (value.trim() === "") throw new WhiteSpacesMessageError();

    if (value.length > 500) throw new MessageTooLongError();

    return new MessageText(value);
  }
}
