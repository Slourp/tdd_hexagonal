import * as path from "path";
import * as fs from "fs";
import Message from "./Message";
import IMessageRepository from "./IMessageRepository";

export class FilsystemMessageRepository implements IMessageRepository {
  public message!: Message;
  private readonly messagePath = path.join(__dirname, "message.json");

  async save(msg: Message): Promise<void> {
    const allMessages = await this.getAllMessages();
    allMessages.push(msg);

    return fs.promises.writeFile(this.messagePath, JSON.stringify(allMessages));
  }

  getMessageById(messageId: string): Message | undefined {
    const messages: Message[] = JSON.parse(
      fs.readFileSync(this.messagePath, "utf-8")
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
