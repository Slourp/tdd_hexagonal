#!/usr/bin/env node

import { Command } from "commander";
import { DateProvider, postMessageCommand } from "./tests/post-message.usecase";
import { PostMessageUseCase } from "./tests/post-message.usecase";
import { InMemoryMessageRepository } from "./tests/message.inmemory.repository";
import { FilsystemMessageRepository } from "./tests/message.fs.repository";

const program = new Command();
class RealDateProvider implements DateProvider {
  getNow(): Date {
    return new Date();
  }
}
const messageRepository = new FilsystemMessageRepository();
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
