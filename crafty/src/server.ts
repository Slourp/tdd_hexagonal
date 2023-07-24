#!/usr/bin/env node

import { Command } from "commander";
import { DateProvider } from "./tests/post-message.usecase";
import { PostMessageUseCase } from "./tests/post-message.usecase";
import { FilsystemMessageRepository } from "./tests/message.fs.repository";
import postMessageCommand from "./tests/postMessageCommand";

const program = new Command();
class RealDateProvider implements DateProvider {
  getNow(): Date {
    return new Date();
  }
}
const messageRepository = new FilsystemMessageRepository();
// const messageRepository = new InMemoryMessageRepository();

const realDateProvider = new RealDateProvider();
const postMessageUseCase = new PostMessageUseCase(
  messageRepository,
  realDateProvider
);

program
  .version("1.0.0")
  .description("Crafty Social Network")
  .addCommand(
    new Command("post")
      .argument("<user>", "the current user")
      .argument("<message>", "the message to post")
      .action(async (user, message) => {
        const postMessageCommand: postMessageCommand = {
          id: "text-id",
          text: message,
          author: user,
        };
        try {
          await postMessageUseCase.handle(postMessageCommand);
          console.log("[✅] Message posted");
          console.table([messageRepository.message]);
        } catch (error) {
          console.error("[❌]", error);
        }
      })
  );

const main = async () => {
  await program.parseAsync();
};

main();
