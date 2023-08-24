import { FilsystemMessageRepository } from "./message.fs.repository";
import path from "path";
import fs from "fs/promises";
import { messageBuilder } from "./message.builder";

const testMessagePath: string = path.join(__dirname, "./message-test.json");

describe("FileSystemMessageRepository", () => {
  let messageRepository: FilsystemMessageRepository;

  beforeEach(async () => {
    try {
      // Check if the file exists and then delete it
      await fs.access(testMessagePath);
      await fs.unlink(testMessagePath);
      console.log('Test file deleted successfully');
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
      .withText("SomeTest")
      .withPublishedAt(new Date("2023-02-08T15:00:00.000Z"))
      .build();

    await messageRepository.save(expectedMessage);

    // Read the content of the saved file
    const fileContent = await fs.readFile(testMessagePath, "utf-8");

    const savedMessage = JSON.parse(fileContent).find((msg: any) => msg.id === expectedMessage.id);

    const recreatedExpectedMessageFromRepository = messageBuilder(savedMessage).build();

    expect(expectedMessage).toEqual(recreatedExpectedMessageFromRepository);
  });

  afterAll(async () => {
    try {
      // Check if the file exists and then delete it
      await fs.access(testMessagePath);
      await fs.unlink(testMessagePath);
      console.log('Test file deleted successfully');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error('Error during file deletion:', err);
      }
    }
  });
});
