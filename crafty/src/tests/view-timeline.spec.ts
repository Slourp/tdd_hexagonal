import Message from "./Message";
import Timeline from "./Timeline";
import { InMemoryMessageRepository } from "./message.inmemory.repository";
import ViewTimeLineViewCase from "./view-timeline.usecase";

describe("Feature: Viewing a personnal timeline", () => {
  let fixture: Fixture;

  beforeEach(() => (fixture = createFixture()));

  describe("Rule: Message are shown in reverse chronologic", () => {
    xtest("Alice can view 2 messages she has published on her timeline", async () => {
      await fixture.givenTheFollowingMessagesExist([
        {
          author: "Alice",
          text: "My first message",
          id: "message-1",
          publishedAt: new Date("2023-02-07T16:28:00.000Z"),
        },
        {
          author: "Bob",
          text: "Hi it's Bob",
          id: "message-2",
          publishedAt: new Date("2023-02-07T16:29:00.000Z"),
        },
        {
          author: "Alice",
          text: "Hi, how are you all ?",
          id: "message-3",
          publishedAt: new Date("2023-02-07T16:30:00.000Z"),
        },
      ]);

      fixture.givenNowIs(new Date("2023-02-07T16:31:00.000Z"));

      fixture.whenUserSeesAlicesTimeLine("Aline");

      fixture.thenUserShouldSees([
        {
          author: "Alice",
          text: "Hi, how are you all ?",
          publicationTime: "1 minute ago",
        },
        {
          author: "Alice",
          text: "My first message",
          publicationTime: "2 minutes ago",
        },
      ]);
    });
  });
});

const createFixture = () => {
  const messageRepository = new InMemoryMessageRepository();
  const viewTimeLineViewCase = new ViewTimeLineViewCase(messageRepository);
  let timeline: Timeline[];

  return {
    async givenTheFollowingMessagesExist(messages: Message[]) {
      messageRepository.givenExistingMessages(messages);
    },

    givenNowIs(now: Date) {},

    async whenUserSeesAlicesTimeLine(user: string) {
      await viewTimeLineViewCase.handle({ user });
    },
    thenUserShouldSees(expectedTimeline: Timeline[]) {
      expect(timeline).toEqual(expectedTimeline);
    },
  };
};

type Fixture = ReturnType<typeof createFixture>;
