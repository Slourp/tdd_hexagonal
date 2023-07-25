import { MessagingFixture, createMessagingFixture } from "./messaging-fixture";
import { messageBuilder } from "./message.builder";

describe("Feature: Viewing a personal timeline", () => {
  let fixture: MessagingFixture;

  beforeEach(() => {
    fixture = createMessagingFixture();
  });

  describe("Rule: Messages are shown in reverse chronological order", () => {
    test("Alice can view 3 messages she has published on her timeline", async () => {
      const aliceMessageBuilder = messageBuilder().withAuthor("Alice");
      const bobMessageBuilder = messageBuilder().withAuthor("Bob");

      await fixture.givenTheFollowingMessagesExist([
        aliceMessageBuilder
          .withId("message-1")
          .withText("My first message")
          .withPublishedAt(new Date("2023-02-07T16:28:00.000Z"))
          .build(),
        bobMessageBuilder
          .withId("message-2")
          .withText("Hi it's Bob")
          .withPublishedAt(new Date("2023-02-07T16:29:00.000Z"))
          .build(),
        aliceMessageBuilder
          .withId("message-3")
          .withText("Hi, how are you all ?")
          .withPublishedAt(new Date("2023-02-07T16:30:00.000Z"))
          .build(),
        aliceMessageBuilder
          .withId("message-4")
          .withText("My last message")
          .withPublishedAt(new Date("2023-02-07T16:30:30.000Z"))
          .build(),
      ]);

      fixture.givenNowIs(new Date("2023-02-07T16:31:00.000Z"));

      fixture.whenUserSeesUsersTimeLine("Alice");

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
