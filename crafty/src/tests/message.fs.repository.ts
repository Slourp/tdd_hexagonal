import { Message, MessageRepository } from "./post-message.usecase";
import * as path from "path";
import * as fs from "fs";

export class FilsystemMessageRepository implements MessageRepository {
  public message!: Message;

  save(msg: Message): Promise<void> {
    this.message = msg;
    return fs.promises.writeFile(
      path.join(__dirname, "message.json"),
      JSON.stringify(this.message)
    );
  }
}
