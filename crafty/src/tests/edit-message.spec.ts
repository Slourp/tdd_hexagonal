import { messageBuilder } from "./message.builder";
import { MessagingFixture, createMessagingFixture } from "./messaging-fixture";
import { EmptyMessageError, MessageTooLongError } from "./post-message.usecase";

describe("Feature: Editing a message", () => {
  let fixture: MessagingFixture;

  beforeEach(() => (fixture = createMessagingFixture()));

  describe("Rule: The edited text should not be superior to 280 characters", () => {
    test("Alice can edit her message to a text inferior to 280 characters", async () => {
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
    test("Alice can not edit het messageto a text superior to 280 characteres", async () => {
      const textWithMoreThan280Characteres: string =
        "In ex Lorem consequat veniam labore mollit quis aliqua quis eu minim. Commodo adipisicing dolore tempor culpa consectetur ea magna ad sit exercitation culpa adipisicing. Labore non enim laboris dolore commodo officia sint dolor enim. Consectetur eu in ullamco non excepteur enim te.";

      const aliceMessageBuilder = messageBuilder({
        id: "message-id",
        author: "Alice",
        text: "Hello world",
      });

      fixture.givenTheFollowingMessagesExist([aliceMessageBuilder.build()]);

      const editedMessage = aliceMessageBuilder
        .withText(textWithMoreThan280Characteres)
        .build();

      fixture.whenUserEditMessage({
        id: "message-id",
        text: textWithMoreThan280Characteres,
      });

      await fixture.thenMessageShouldBe(editedMessage);
      fixture.thenErrorShouldBe(MessageTooLongError);
    });

    test("Alice Can not edit her message to a empty text", async () => {
      const updatedText: string = "             ";

      const aliceMessageBuilder = messageBuilder({
        id: "message-id",
        author: "Alice",
        text: "I'm the initial alice's text !",
      });

      fixture.givenTheFollowingMessagesExist([aliceMessageBuilder.build()]);

      const editedMessage = aliceMessageBuilder.withText(updatedText).build();

      fixture.whenUserEditMessage({
        id: "message-id",
        text: updatedText,
      });

      await fixture.thenMessageShouldBe(editedMessage);
      fixture.thenErrorShouldBe(EmptyMessageError);
    });
  });
});
