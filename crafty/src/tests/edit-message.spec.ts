import { messageBuilder } from "./message.builder";
import { MessagingFixture, createMessagingFixture } from "./messaging-fixture";

describe("Feature: Editing a message", () => {
  let fixture: MessagingFixture;

  beforeEach(() => (fixture = createMessagingFixture()));

  describe("Rule: The edited text should not be superior to 280 characters", () => {
    xtest("Alice can edit her message to a text inferior to 280 characters", async () => {
      const aliceMessageBuilder = messageBuilder({
        id: "message-id",
        author: "Alice",
        text: "Hello wold",
      });

      fixture.givenTheFollowingMessagesExist([aliceMessageBuilder.build()]);

      const editedMessage = aliceMessageBuilder.withText("Hello world").build();

      fixture.whenUserEditMessage({
        id: "message-id",
        text: "Hello world",
      });

      fixture.thenMessageShouldBe(editedMessage);
    });
  });
});
