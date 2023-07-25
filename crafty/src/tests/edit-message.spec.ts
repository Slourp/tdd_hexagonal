import { MessagingFixture, createMessagingFixture } from "./messaging-fixture";

describe("Feature: Editing a message", () => {
  let fixture: MessagingFixture;

  beforeEach(() => {
    fixture = createMessagingFixture();
  });

  it("should not update the message text when edited text is longer than 280 characters", async () => {
    xtest("Alice can edit  her message  to a text inferior to 280 caracteres", async () => {
      fixture.givenTheFollowingMessagesExist([
        {
          id: "message-id",
          author: "Alice",
          text: "Hello wold",
          publishedAt: new Date("2023-02-16T11:48:00.000Z"),
        },
      ]);

      fixture.whenUserEditMessage({
        id: "message-id",
        text: "Hello world",
      });
      fixture.thenMessageShouldBe({
        id: "message-id",
        author: "Alice",
        text: "Hello world",
        publishedAt: new Date("2023-02-16T11:48:00.000Z"),
      });
    });
  });
});
