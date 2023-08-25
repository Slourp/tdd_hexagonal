import DateProvider from "./IDateProvider";
import IMessageRepository from "./IMessageRepository";
import Message, { MessageText } from "./Message";
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
  ) { }
  async handle(postMessageCommand: postMessageCommand) {
    const message: Message = Message.fromData({
      ...postMessageCommand,
      publishedAt: this.dateProvider.getNow().toISOString(),
    })

    await this.messageRepository.save(message);
  }
}
