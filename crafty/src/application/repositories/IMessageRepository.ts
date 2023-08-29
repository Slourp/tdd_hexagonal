import Message from "../../domain/Message";

/**
 * Represents a repository for managing messages.
 */
export default interface IMessageRepository {
  /**
   * Save a message to the repository.
   * @param message - The message to be saved.
   */
  save(message: Message): Promise<void>;

  /**
   * Get a message by its unique ID.
   * @param messageId - The ID of the message to retrieve.
   * @returns The retrieved message or undefined if not found.
   */
  getMessageById(messageId: string): Promise<Message>;

  /**
   * Load a list of existing messages into the repository.
   * @param messages - An array of messages to be added.
   */
  givenExistingMessages(messages: Message[]): void;

  /**
   * Get all messages associated with a specific user.
   * @param user - The user for whom to retrieve messages.
   * @returns An array of messages associated with the user.
   */
  getUsersMessages(user: string): Promise<Message[]>;

  /**
   * Get all messages stored in the repository.
   * @returns An array of all stored messages.
   */
  getAllMessages(): Promise<Message[]>;

  /**
   * Edit an existing message in the repository.
   * @param message - The message to be edited.
   */
  edit(message: Message): Promise<void>;
}
