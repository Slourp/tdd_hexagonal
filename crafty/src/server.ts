#!/usr/bin/env node

import { Command } from "commander";
import { DateProvider, postMessageCommand } from "./tests/post-message.usecase";
import { PostMessageUseCase } from "./tests/post-message.usecase";
import { InMemoryMessageRepository } from "./tests/message.inmemory.repository";
import { FilsystemMessageRepository } from "./tests/message.fs.repository";


const program = new Command();
class RealDateProvider implements DateProvider {
    getNow(): Date {
        return new Date()
    }
}
const messageRepository = new FilsystemMessageRepository()
const realDateProvider = new RealDateProvider()
const postMessageUseCase = new PostMessageUseCase(messageRepository, realDateProvider)
program
    .version('1.0.0')
    .description('A command-line tool for posting messages')
    .command('post <user> <message>')
    .description('Post a message')
    .action(async (user, message) => {
        const postMessageCommand: postMessageCommand = {
            id: "text-id",
            text: message,
            author: user
        }
        try {
            await postMessageUseCase.handle(postMessageCommand)
            console.log("[✅] Message posted")
            console.table([messageRepository.message])

        } catch (error) {
            console.error("[❌]", error)
        }
    });

program.parse(process.argv);
