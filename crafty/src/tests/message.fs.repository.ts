import * as path from "path";
import * as fs from "fs";
import Message from "./Message";
import IMessageRepository from "./IMessageRepository";

export class FilsystemMessageRepository implements IMessageRepository {
  public message!: Message;
  private readonly messagePath = path.join(__dirname, "message.json");

  async save(msg: Message): Promise<void> {
    const allMessages = await this.getAllMessages();
    const updatedMessages = allMessages.map((message) =>
      message.id === msg.id ? msg : message
    );

    // If message doesn't exist in the list, push it
    if (!updatedMessages.some((message) => message.id === msg.id)) {
      updatedMessages.push(msg);
    }

    return fs.promises.writeFile(
      this.messagePath,
      JSON.stringify(updatedMessages)
    );
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
    return fs.promises.writeFile(this.messagePath, JSON.stringify(messages));
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
    const messages: Message[] = messageObjects.map((messageObj) => ({
      id: messageObj.id,
      text: messageObj.text,
      // Assuming publishedAt is in a string format that can be parsed to a Date object
      publishedAt: new Date(messageObj.publishedAt),
      author: messageObj.author,
    }));

    return messages;
  }
}
