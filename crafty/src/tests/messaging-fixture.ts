import IMessageRepository from "./IMessageRepository";
import Message from "./Message";
import Timeline from "./Timeline";
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
  let timeline: Timeline[];
  let thrownError: Error;

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
    thenMessageShouldBe(expectedMessage: Message) {
      expect(expectedMessage).toEqual(
        messageRepository.getMessageById(expectedMessage.id)
      );
    },
    thenErrorShouldBe(expectErrorClass: new () => Error) {
      expect(thrownError).toBeInstanceOf(expectErrorClass);
    },
    async whenUserEditMessage(message: { id: string; text: string }) {
      // Implémentez cette fonction selon vos besoins
    },
  };
};

export type MessagingFixture = ReturnType<typeof createMessagingFixture>;
