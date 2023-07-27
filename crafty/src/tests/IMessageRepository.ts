import Message from "./Message";

export default interface IMessageRepository {
  save(message: Message): Promise<void>;

  getMessageById(messageId: string): Promise<Message | undefined>;

  givenExistingMessages(messages: Message[]): void;

  getUsersMessages(user: string): Promise<Message[]>;

  getAllMessages(): Promise<Message[]>;

  edit(message: Message): Promise<void>;
}
