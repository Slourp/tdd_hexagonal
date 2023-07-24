import * as path from "path";
import * as fs from "fs";
import Message from "./Message";
import IMessageRepository from "./IMessageRepository";

export class FilsystemMessageRepository implements IMessageRepository {
  public message!: Message;

  save(msg: Message): Promise<void> {
    this.message = msg;
    return fs.promises.writeFile(
      path.join(__dirname, "message.json"),
      JSON.stringify(this.message)
    );
  }

  getMessageById(messageId: string): Message | undefined {
    const messages: Message[] = JSON.parse(
      fs.readFileSync(path.join(__dirname, "message.json"), "utf-8")
    );

    return messages.find((msg) => msg.id === messageId);
  }

  givenExistingMessages(messages: Message[]): Promise<void> {
    return fs.promises.writeFile(
      path.join(__dirname, "message.json"),
      JSON.stringify(messages)
    );
  }

  async getUsersMessages(user: string): Promise<Message[]> {
    const data = await fs.promises.readFile(
      path.join(__dirname, "message.json"),
      "utf-8"
    );
    const messages = JSON.parse(data);
    return messages.filter((msg) => msg.author === user);
  }
}
