import { editMessageCommand } from "../application/usecases/edit-message.usecase";
import { EmptyMessageError, MessageTooLongError } from "../application/usecases/post-message.usecase";
import Message from "./Message";
import { messageBuilder } from "./message.builder";
import { MessagingFixture } from "./messaging-fixture";

describe("Feature: Editing a message", () => {
  let fixture: MessagingFixture;

  beforeEach(() => fixture = new MessagingFixture());

  describe("Rule: The edited text should not be superior to 280 characters", () => {
    test("Alice can edit her message to a text inferior to 280 characters", async () => {
      const aliceMessageBuilder = messageBuilder({
        id: "message-id",
        author: "Alice",
        text: "Hello wold",
      });

      fixture.givenTheFollowingMessagesExist([aliceMessageBuilder.build()]);

      const editedMessage = aliceMessageBuilder.withText("Hello world").build();

      const editMessageCommand: editMessageCommand = {
        id: editedMessage.id,
        text: editedMessage.text,
      }

      await fixture.whenUserEditMessage(editMessageCommand);

      await fixture.thenMessageShouldBe(editedMessage);
    });

    test("Alice cannot edit her message to a text superior to 280 characters", async () => {
      const textWithMoreThan280Characters =
        "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla non ar"; // trimmed for brevity

      const aliceMessageBuilder = messageBuilder({
        id: "message-id",
        author: "Alice",
        text: "Hello world",
      });

      const originalMessage = aliceMessageBuilder.build()

      fixture.givenTheFollowingMessagesExist([originalMessage]);

      await fixture.whenUserEditMessage({
        id: originalMessage.id,
        text: textWithMoreThan280Characters,
      });

      // If the builder doesn't allow text >280 characters, the message should remain unchanged.
      await fixture.thenMessageShouldBe(aliceMessageBuilder.build());
      fixture.thenErrorShouldBe(MessageTooLongError);
    });


    test("Alice cannot edit her message to an empty text", async () => {
      const updatedTextEmptyText: string = "";

      const aliceMessageBuilder = messageBuilder()
        .withId("message-id")
        .withAuthor("Alice")
        .withText("I'm the initial Alice's text!");


      const initialAlicesMessage: Message = aliceMessageBuilder.build()

      fixture.givenTheFollowingMessagesExist([initialAlicesMessage]);

      const editedMessage: editMessageCommand = {
        id: initialAlicesMessage.id,
        text: updatedTextEmptyText
      };

      await fixture.whenUserEditMessage(editedMessage);

      await fixture.thenMessageShouldBe(initialAlicesMessage);
      // fixture.thenErrorShouldBe(EmptyMessageError);
    });
  });
});
