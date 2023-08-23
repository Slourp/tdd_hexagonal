import IMessageRepository from "./IMessageRepository";
import Message from "./Message";
import Timeline from "./Timeline";
import EditMessageUseCase, { editMessageCommand } from "./edit-message.usecase";
import { InMemoryMessageRepository } from "./message.inmemory.repository";
import { PostMessageUseCase } from "./post-message.usecase";
import postMessageCommand from "./postMessageCommand";
import StubeDateProvider from "./stub-date-provider";
import ViewTimeLineViewCase from "./view-timeline.usecase";


class MessagingFixture {
  private dateProvider: StubeDateProvider;
  private messageRepository: IMessageRepository;
  private postMessageUseCase: PostMessageUseCase;
  private viewTimeLineViewCase: ViewTimeLineViewCase;
  private editMessageUseCase: EditMessageUseCase;
  private thrownError: Error | undefined;
  private timeline: Timeline[] | undefined;

  constructor() {
    this.dateProvider = new StubeDateProvider();
    this.messageRepository = new InMemoryMessageRepository();
    this.postMessageUseCase = new PostMessageUseCase(
      this.messageRepository,
      this.dateProvider
    );
    this.viewTimeLineViewCase = new ViewTimeLineViewCase(
      this.messageRepository,
      this.dateProvider
    );
    this.editMessageUseCase = new EditMessageUseCase(this.messageRepository);
  }

  givenNowIs(now: Date) {
    this.dateProvider.now = now;
  }

  async givenTheFollowingMessagesExist(messages: Message[]) {
    this.messageRepository.givenExistingMessages(messages);
  }

  async whenUserPostsAmessage(postMessageCommand: postMessageCommand) {
    try {
      await this.postMessageUseCase.handle(postMessageCommand);
    } catch (error: any) {
      this.thrownError = error;
    }
  }

  async whenUserSeesUsersTimeLine(user: string) {
    this.timeline = await this.viewTimeLineViewCase.handle({ user });
    return;
  }

  thenUserShouldSees(expectedTimeline: Timeline[]) {
    expect(this.timeline).toEqual(expectedTimeline);
  }

  async thenMessageShouldBe(expectedMessage: Message) {
    const message = await this.messageRepository.getMessageById(
      expectedMessage.id
    );
    expect(expectedMessage).toEqual(message);
  }

  thenErrorShouldBe(expectErrorClass: new () => Error) {
    expect(this.thrownError).toBeInstanceOf(expectErrorClass);
  }

  async whenUserEditMessage(editMessageCommand: editMessageCommand) {
    try {
      await this.editMessageUseCase.handle(editMessageCommand);
    } catch (error) {
      this.thrownError = error;
    }
  }
}

export { MessagingFixture };
