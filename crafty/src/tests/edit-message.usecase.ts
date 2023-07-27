import IMessageRepository from "./IMessageRepository";
import Message from "./Message";
import { EmptyMessageError, MessageTooLongError } from "./post-message.usecase";

export type editMessageCommand = {
  id: string;
  text: string;
};

class EditMessageUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async handle(editMessageCommand: editMessageCommand) {
    if (editMessageCommand.text.length >= 280) throw new MessageTooLongError();

    if (editMessageCommand.text.length == 0) throw new EmptyMessageError();

    const message = await this.messageRepository.getMessageById(
      editMessageCommand.id
    );

    if (!message) {
      console.log("Message not found with ID:", editMessageCommand.id);
      return;
    }
    const editedMessagetoBeSaved: Message = {
      ...message,
      text: editMessageCommand.text,
    };
    try {
      await this.messageRepository.save(editedMessagetoBeSaved);
    } catch (error) {
      // Handle any error that may occur during saving
      console.error("Error saving message:", error);
    }
  }
}

export default EditMessageUseCase;
