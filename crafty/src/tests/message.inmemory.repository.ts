import { Message, MessageRepository } from "./post-message.usecase";

export class InMemoryMessageRepository implements MessageRepository {
    public message!: Message

    save(msg: Message): Promise<void> {
        this.message = msg;
        return Promise.resolve()
    }
}