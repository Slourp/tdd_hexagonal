import IMessageRepository from "./IMessageRepository";
import Message from "./Message";
import Timeline from "./Timeline";
import EditMessageUseCase, { editMessageCommand } from "./edit-message.usecase";
import { InMemoryMessageRepository } from "./message.inmemory.repository";
import { PostMessageUseCase } from "./post-message.usecase";
import postMessageCommand from "./postMessageCommand";
import StubeDateProvider from "./stub-date-provider";
import ViewTimeLineViewCase from "./view-timeline.usecase";

export const createMessagingFixture = () => {
  // Déclarations et initialisations
  const dateProvider = new StubeDateProvider();
  const messageRepository: IMessageRepository = new InMemoryMessageRepository();
  const postMessageUseCase = new PostMessageUseCase(
    messageRepository,
    dateProvider
  );
  const viewTimeLineViewCase = new ViewTimeLineViewCase(
    messageRepository,
    dateProvider
  );

  const editMessageUseCase = new EditMessageUseCase(messageRepository);

  let thrownError: Error;
  let timeline: Timeline[];

  return {
    // Fonctions pour les tests
    givenNowIs(now: Date) {
      dateProvider.now = now;
    },
    async givenTheFollowingMessagesExist(messages: Message[]) {
      messageRepository.givenExistingMessages(messages);
    },
    thenUserShouldSees(expectedTimeline: Timeline[]) {
      expect(timeline).toEqual(expectedTimeline);
    },
    async whenUserPostsAmessage(postMessageCommand: postMessageCommand) {
      try {
        await postMessageUseCase.handle(postMessageCommand);
      } catch (error: any) {
        thrownError = error;
      }
    },
    async whenUserSeesUsersTimeLine(user: string) {
      await viewTimeLineViewCase.handle({ user });
    },
    async thenMessageShouldBe(expectedMessage: Message) {
      const message = messageRepository.getMessageById(expectedMessage.id);
      expect(expectedMessage).toEqual(message);
    },
    thenErrorShouldBe(expectErrorClass: new () => Error) {
      expect(thrownError).toBeInstanceOf(expectErrorClass);
    },
    async whenUserEditMessage(editMessageCommand: editMessageCommand) {
      try {
        editMessageUseCase.handle(editMessageCommand);
      } catch (error) {
        thrownError = error;
      }
    },
  };
};

export type MessagingFixture = ReturnType<typeof createMessagingFixture>;
