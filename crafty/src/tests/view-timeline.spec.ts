import { MessagingFixture, createMessagingFixture } from "./messaging-fixture";

describe("Feature: Viewing a personnal timeline", () => {
  let fixture: MessagingFixture;

  beforeEach(() => (fixture = createMessagingFixture()));

  describe("Rule: Message are shown in reverse chronologic", () => {
    test("Alice can view 3 messages she has published on her timeline", async () => {
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
        {
          author: "Alice",
          text: "My last message",
          id: "message-4",
          publishedAt: new Date("2023-02-07T16:30:30.000Z"),
        },
      ]);

      fixture.givenNowIs(new Date("2023-02-07T16:31:00.000Z"));

      fixture.whenUserSeesUsersTimeLine("Aline");

      fixture.thenUserShouldSees([
        {
          author: "Alice",
          text: "My last message",
          publicationTime: "Less than a minute ago",
        },
        {
          author: "Alice",
          text: "Hi, how are you all ?",
          publicationTime: "1 minute ago",
        },
        {
          author: "Alice",
          text: "My first message",
          publicationTime: "3 minutes ago",
        },
      ]);
    });
  });
});
