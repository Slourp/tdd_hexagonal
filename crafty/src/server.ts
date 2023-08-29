#!/usr/bin/env node
import { Command } from "commander";
import { v4 as uuidv4 } from "uuid";
import { FilsystemMessageRepository } from "./infra/repositories/message.fs.repository";
import { PostMessageUseCase } from "./application/usecases/post-message.usecase";
import ViewTimeLineViewCase from "./application/usecases/view-timeline.usecase";
import EditMessageUseCase, { editMessageCommand } from "./application/usecases/edit-message.usecase";
import postMessageCommand from "./tests/postMessageCommand";
import RealDateProvider from "./real-date-provider";
import { exit } from "process";


const program = new Command();


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

const editMessageUseCase = new EditMessageUseCase(messageRepository);

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
  )
  .addCommand(
    new Command("edit")
      .argument("<message-id>", "ID of the message slated for update")
      .argument("<new-message>", "the new message text")
      .action(async (messageId, message) => {
        const editMessageCommand: editMessageCommand = {
          id: messageId,
          text: message,
        };
        try {
          await editMessageUseCase.handle(editMessageCommand);
          console.log("[✅] Message edited");
          console.table([
            messageRepository.getMessageById(editMessageCommand.id),
          ]);
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
