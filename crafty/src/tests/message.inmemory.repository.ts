import IMessageRepository from "./IMessageRepository";
import Message from "./Message";

export class InMemoryMessageRepository implements IMessageRepository {
  // Declaration of the `messages` variable of type `Map` with keys of type `string` and values of type `Message`
  private messages: Map<string, Message> = new Map();

  // Explanation of angle brackets <>:
  // Angle brackets are used to specify generic types
  // Here, we are specifying that the `Map` will have keys of type `string` and values of type `Message`

  // Note: The comments above are explanations to help you understand the code. They are not part of the code itself.

  save(msg: Message): Promise<void> {
    this._save(msg);
    return Promise.resolve();
  }

  getMessageById(messageId: string) {
    return this.messages.get(messageId);
  }

  givenExistingMessages(messages: Message[]) {
    messages.forEach(this._save.bind(this));
  }

  getUsersMessages(user: string): Promise<Message[]> {
    const messagesByUser: Message[] = Array.from(this.messages.values()).filter(
      (msg: Message) => msg.author === user
    );

    return Promise.resolve(messagesByUser);
  }

  getAllMessages(): Promise<Message[]> {
    const allMessages: Message[] = [...this.messages.values()];
    return Promise.resolve(allMessages);
  }

  private _save(message: Message) {
    this.messages.set(message.id, message);
  }
}
