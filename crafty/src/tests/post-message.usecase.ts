import { InMemoryMessageRepository } from "./message.inmemory.repository";
import postMessageCommand from "./postMessageCommand";

export interface DateProvider {
  getNow(): Date;
}

export class MessageTooLongError extends Error {}

export class EmptyMessageError extends Error {}
export class WhiteSpacesMessageError extends Error {}

export class PostMessageUseCase {
  constructor(
    private readonly messageRepository: InMemoryMessageRepository,
    private readonly dateProvider: DateProvider
  ) {}
  async handle(postMessageCommand: postMessageCommand) {
    if (postMessageCommand.text.length >= 280) throw new MessageTooLongError();

    if (postMessageCommand.text.length == 0) throw new EmptyMessageError();

    if (postMessageCommand.text.trim().length == 0)
      throw new WhiteSpacesMessageError();

    await this.messageRepository.save({
      id: postMessageCommand.id,
      text: postMessageCommand.text,
      author: postMessageCommand.author,
      publishedAt: this.dateProvider.getNow(),
    });
  }
}
