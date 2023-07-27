import DateProvider from "./IDateProvider";
import IMessageRepository from "./IMessageRepository";
import { MessageText } from "./Message";
import postMessageCommand from "./postMessageCommand";

export class MessageTooLongError extends Error {
  constructor() {
    super("The message text is too long.");
  }
}

export class EmptyMessageError extends Error {
  constructor() {
    super("The message text cannot be empty.");
  }
}

export class WhiteSpacesMessageError extends Error {
  constructor() {
    super("The message text cannot contain only white spaces.");
  }
}

export class PostMessageUseCase {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly dateProvider: DateProvider
  ) {}
  async handle(postMessageCommand: postMessageCommand) {
    const messageText = MessageText.of(postMessageCommand.text);

    await this.messageRepository.save({
      id: postMessageCommand.id,
      text: messageText,
      author: postMessageCommand.author,
      publishedAt: this.dateProvider.getNow(),
    });
  }
}
