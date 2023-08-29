import { MessageTooLongError, WhiteSpacesMessageError } from "../../application/usecases/post-message.usecase";
import Message from "../../domain/Message";
import { messageBuilder } from "../message.builder";
import { MessagingFixture } from "../messaging-fixture";
import postMessageCommand from "../postMessageCommand";

describe("Feature: posting a message", () => {
  let fixtures: MessagingFixture;

  beforeEach(() => {
    fixtures = new MessagingFixture();
  });

  describe("Rule: A message can contain a maximum of 280 characters", () => {
    test("Alice can post a message on her timeline", async () => {
      fixtures.givenNowIs(new Date("2023-01-19T19:00:00.000Z"));
      const aliceMessageBuilder = messageBuilder()
        .withId("message-id")
        .withAuthor("Alice")
        .withText("Hello world")
        .withPublishedAt(new Date("2023-01-19T19:00:00.000Z"));

      const aliceBuildedMessage: Message = aliceMessageBuilder.build();

      const postMessageCommand: postMessageCommand = {
        id: aliceBuildedMessage.id,
        text: aliceBuildedMessage.text,
        author: aliceBuildedMessage.author,
      }

      await fixtures.whenUserPostsAmessage(postMessageCommand
      );

      await fixtures.thenMessageShouldBe(aliceBuildedMessage);
    });

    test("Alice cannot post a message with more than 280 characters", async () => {
      const textWithMoreThan280Characters =
        "In ex Lorem consequat veniam labore mollit quis aliqua quis eu minim. Commodo adipisicing dolore tempor culpa consectetur ea magna ad sit exercitation culpa adipisicing. Labore non enim laboris dolore commodo officia sint dolor enim. Consectetur eu in ullamco non excepteur enim te.";

      fixtures.givenNowIs(new Date("2023-01-19T19:00:00.000Z"));

      const postMessageCommand: postMessageCommand = {
        id: "message-id",
        author: "Alice",
        text: textWithMoreThan280Characters,
      }

      await fixtures.whenUserPostsAmessage(postMessageCommand);

      fixtures.thenErrorShouldBe(MessageTooLongError);
    });

    test("Alice cannot post a message with only white spaces", async () => {
      const textWithWhiteSpaces = "      ";

      fixtures.givenNowIs(new Date("2023-01-19T19:00:00.000Z"));

      await fixtures.whenUserPostsAmessage({
        id: "message-id",
        author: "Alice",
        text: textWithWhiteSpaces,
      });

      fixtures.thenErrorShouldBe(WhiteSpacesMessageError);
    });
  });
});
