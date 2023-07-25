#!/usr/bin/env node
import { v4 as uuidv4 } from "uuid";

import { Command } from "commander";
import { PostMessageUseCase } from "./tests/post-message.usecase";
import { FilsystemMessageRepository } from "./tests/message.fs.repository";
import postMessageCommand from "./tests/postMessageCommand";
import DateProvider from "./tests/IDateProvider";
import ViewTimeLineViewCase from "./tests/view-timeline.usecase";
import { exit } from "process";

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

const viewTimeLineViewCase = new ViewTimeLineViewCase(
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
          id: uuidv4(),
          text: message,
          author: user,
        };
        try {
          await postMessageUseCase.handle(postMessageCommand);
          console.log("[✅] Message posted");
          console.table([
            messageRepository.getMessageById(postMessageCommand.id),
          ]);
          exit(0);
        } catch (error) {
          console.error("[❌]", error);
          exit(1);
        }
      })
  )
  .addCommand(
    new Command("view")
      .argument("<user>", "the user whose timeline is to be viewed")
      .action(async (user) => {
        try {
          const timeLine = await viewTimeLineViewCase.handle({ user });
          console.table(timeLine);
          exit(0);
        } catch (error) {
          console.error("[❌]", error);
          exit(1);
        }
      })
  );

const main = async () => {
  await program.parseAsync();
};

main();
