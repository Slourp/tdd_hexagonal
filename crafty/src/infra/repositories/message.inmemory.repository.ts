import IMessageRepository from "../../application/repositories/IMessageRepository";
import Message from "../../domain/Message";

export class InMemoryMessageRepository implements IMessageRepository {
  private messages: Map<string, Message> = new Map();

  async save(msg: Message): Promise<void> {
    this._save(msg);
  }

  async edit(msg: Message): Promise<void> {
    if (!this.messages.has(msg.id)) {
      throw new Error(`Message with id: ${msg.id} does not exist.`);
    }

    await this.save(msg);
  }

  async getMessageById(messageId: string): Promise<Message | undefined> {
    return this.messages.get(messageId);
  }

  givenExistingMessages(messages: Message[]): void {
    messages.forEach(this._save.bind(this));
    return;
  }

  async getUsersMessages(user: string): Promise<Message[]> {
    const messagesByUser: Message[] = [
      ...Array.from(this.messages.values()).filter(
        (msg: Message) => msg.author === user
      ),
    ];

    return messagesByUser;
  }

  async getAllMessages(): Promise<Message[]> {
    const allMessages: Message[] = [...Array.from(this.messages.values())];
    return allMessages;
  }

  private _save(message: Message) {
    this.messages.set(message.id, message);
  }
}
