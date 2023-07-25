import { messageBuilder } from "./message.builder";
import { MessagingFixture, createMessagingFixture } from "./messaging-fixture";

describe("Feature: Editing a message", () => {
  let fixture: MessagingFixture;

  beforeEach(() => {
    fixture = createMessagingFixture();
  });

  it("should not update the message text when edited text is longer than 280 characters", async () => {
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
