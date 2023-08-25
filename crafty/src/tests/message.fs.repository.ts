import * as path from "path";
import * as fs from "fs";
import Message, { MessageText } from "./Message";
import IMessageRepository from "./IMessageRepository";

export class FilsystemMessageRepository implements IMessageRepository {
  public message!: Message;
  constructor(
    private readonly messagePath = path.join(__dirname, "message.json")) { }

  private serializeMessages(messages: Message[]): string {
    return JSON.stringify(messages.map((message) => message.getData()));
  }

  async save(msgToSave: Message): Promise<void> {
    const allMessages = await this.getAllMessages();
    const updatedMessages = allMessages.map((message) =>
      message.id === msgToSave.id ? msgToSave : message
    );

    // If message doesn't exist in the list, push it
    if (!updatedMessages.some((message) => message.id === msgToSave.id)) {
      updatedMessages.push(msgToSave);
    }

    const serializedMessages = this.serializeMessages(updatedMessages);

    return fs.promises.writeFile(this.messagePath, serializedMessages);
  }

  async edit(msg: Message): Promise<void> {
    const allMessages = await this.getAllMessages();

    // If message doesn't exist, throw error
    if (!allMessages.some((message) => message.id === msg.id))
      throw new Error(`Message with id: ${msg.id} does not exist.`);

    return this.save(msg);
  }

  async getMessageById(messageId: string): Promise<Message | undefined> {
    const messages: Message[] = JSON.parse(
      await fs.promises.readFile(this.messagePath, "utf-8")
    );

    return messages.find((msg) => msg.id === messageId);
  }

  givenExistingMessages(messages: Message[]): Promise<void> {
    return fs.promises.writeFile(this.messagePath, this.serializeMessages(messages));
  }

  async getUsersMessages(user: string): Promise<Message[]> {
    return (await this.getAllMessages()).filter((msg) => msg.author === user);
  }

  async getAllMessages(): Promise<Message[]> {
    // Read data from the file and parse it as an array of objects with specific properties
    const data = await fs.promises.readFile(this.messagePath, "utf-8");
    const messageObjects = JSON.parse(data) as {
      id: string;
      text: string;
      author: string;
      publishedAt: string;
    }[];

    // Whitelisting: Create Message objects with only the necessary properties (id, text, author, publishedAt)
    const messages: Message[] = messageObjects.map((messageObj) => (Message.fromData(messageObj)));

    return messages;
  }
}
