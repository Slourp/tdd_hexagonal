import { FilsystemMessageRepository } from "./message.fs.repository";
import path from "path";
import fs from "fs/promises";
import { messageBuilder } from "./message.builder";
import Message from "./Message";

const testMessagePath: string = path.join(__dirname, "./message-test.json");

describe("FileSystemMessageRepository", () => {
  let messageRepository: FilsystemMessageRepository;

  beforeEach(async () => {
    try {
      // Check if the file exists and then delete it
      await fs.access(testMessagePath);
      await fs.unlink(testMessagePath);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error('Error during file deletion:', err);
      }
    }

    // Create the directory if it doesn't exist
    const testDirectory = path.dirname(testMessagePath);
    await fs.mkdir(testDirectory, { recursive: true });

    // Create a JSON file with an empty array as initial content
    await fs.writeFile(testMessagePath, JSON.stringify([]));

    messageRepository = new FilsystemMessageRepository(testMessagePath);
  });

  test("save() can Save a message in the filesystem", async () => {
    const expectedMessage = messageBuilder()
      .withId("message-id")
      .withAuthor("Alice")
      .withText("SomeTest SomeTest SomeTest")
      .withPublishedAt(new Date("2023-02-08T15:00:00.000Z"))
      .build();

    // console.log("test", expectedMessage.getData())
    await messageRepository.save(expectedMessage);

    // Read the content of the saved file
    const fileContent = await fs.readFile(testMessagePath, "utf-8");

    const savedMessage = Message.fromData(JSON.parse(fileContent).find((msg: any) => msg.id === expectedMessage.id));

    const recreatedExpectedMessageFromRepository = messageBuilder({
      id: savedMessage.id,
      author: savedMessage.author,
      text: savedMessage.text,
      publishedAt: savedMessage.publishedAt,
    }).build();

    expect(expectedMessage).toEqual(recreatedExpectedMessageFromRepository);
  });

  test("edit() can edit a saved message in the filesystem", async () => {
    const initialMessageBuilder = messageBuilder()
      .withId("message-id")
      .withAuthor("Alice")
      .withText("InitialText")
      .withPublishedAt(new Date("2023-02-08T15:00:00.000Z"));

    const initialMessageDto: Message = initialMessageBuilder.build();

    const editedMessageDto: Message = initialMessageBuilder
      .withText("EditedText")
      .withPublishedAt(new Date("2023-02-10T12:00:00.000Z"))
      .build();

    // Save the initial message
    await messageRepository.save(initialMessageDto);


    // Edit the message using the repository's edit() function
    await messageRepository.edit(editedMessageDto);

    // Read the content of the saved file after editing
    const fileContentAfterEdit = await fs.readFile(testMessagePath, "utf-8");

    // Parse the JSON content and find the edited message
    const savedMessagesAfterEdit = JSON.parse(fileContentAfterEdit);

    // Find the edited message in the saved messages
    const editedSavedMessage = savedMessagesAfterEdit.find(
      (msg: any) => msg.id === editedMessageDto.id
    );

    // Recreate the expected edited message from the editedSavedMessage
    const editedSavedMessageDto = messageBuilder(editedSavedMessage).build();


    // Ensure that the message before editing is not the same as after editing
    expect(editedSavedMessageDto).not.toEqual(initialMessageDto);
    expect(editedSavedMessageDto).toEqual(editedMessageDto);

  });

  describe("get Message by Id", () => {
    test("For a given message , we should fetch it by the id", async () => {
      const initialMessageBuilder = messageBuilder()
        .withId("message-id-123")
        .withAuthor("Alice")
        .withText("InitialText")
        .withPublishedAt(new Date("2023-02-08T15:00:00.000Z"));

      const initialMessageDto: Message = initialMessageBuilder.build();

      // Save the initial message
      await messageRepository.save(initialMessageDto);

      // Fetch message by id
      const fetchedMessagebyIdDto = await messageRepository.getMessageById(initialMessageDto.id);

      expect(initialMessageDto.id).toEqual(fetchedMessagebyIdDto.id);

    })

    test("Fetching a non-existing message should return undefined", async () => {

      const undefinedMessage: Message | undefined = await messageRepository.getMessageById("888");

      expect(undefinedMessage).toBeUndefined

    })

    test("getAllMessages() should return all saved messages", async () => {

      const initialMessages: Message[] = [
        messageBuilder()
          .withId("message-id-1")
          .withAuthor("Alice")
          .withText("Message 1")
          .withPublishedAt(new Date("2023-02-08T15:00:00.000Z"))
          .build(),

        messageBuilder()
          .withId("message-id-2")
          .withAuthor("Bob")
          .withText("Message 2")
          .withPublishedAt(new Date("2023-02-09T12:00:00.000Z"))
          .build(),
      ];

      // Save the initial messages to the repository
      await messageRepository.givenExistingMessages(initialMessages);

      // Retrieve all messages using getAllMessages
      const retrievedMessages: Message[] = await messageRepository.getAllMessages();

      // Assert that the retrieved messages match the expected messages
      expect(retrievedMessages).toEqual(initialMessages);
    });

    test("getUsersMessages() should return messages for a specific user", async () => {
      const initialMessages = [
        messageBuilder()
          .withId("message-id-1")
          .withAuthor("Alice")
          .withText("Message 1")
          .withPublishedAt(new Date("2023-02-08T15:00:00.000Z"))
          .build(),
        messageBuilder()
          .withId("message-id-2")
          .withAuthor("Bob")
          .withText("Message 2")
          .withPublishedAt(new Date("2023-02-09T12:00:00.000Z"))
          .build(),
        messageBuilder()
          .withId("message-id-3")
          .withAuthor("Alice")
          .withText("Message 3")
          .withPublishedAt(new Date("2023-02-10T18:00:00.000Z"))
          .build(),
      ];

      // Save the initial messages to the repository
      await messageRepository.givenExistingMessages(initialMessages);

      // Retrieve messages for user "Alice" using getUsersMessages
      const retrievedMessages: Message[] = await messageRepository.getUsersMessages("Alice");

      // Filter the initial messages for user "Alice"
      const expectedMessagesForAlice: Message[] = initialMessages.filter(
        (message) => message.author === "Alice"
      );

      expect(retrievedMessages).toHaveLength(2)

    });

  })


  afterAll(async () => {
    try {
      // Check if the file exists and then delete it
      await fs.access(testMessagePath);
      await fs.unlink(testMessagePath);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error('Error during file deletion:', err);
      }
    }
  });
});
