import IMessageRepository from "../../application/repositories/IMessageRepository";
import Message from "../../domain/Message";

export type editMessageCommand = {
  id: string;
  text: string;
};

class EditMessageUseCase {
  constructor(private messageRepository: IMessageRepository
  ) { }

  async handle(editMessageCommand: editMessageCommand) {
    const message = await this.messageRepository.getMessageById(
      editMessageCommand.id
    );

    if (!message) {
      console.log("Message not found with ID:", editMessageCommand.id);
      return;
    }

    const editedMessagetoBeSaved: Message = Message.fromData({
      ...message.getData(),
      text: editMessageCommand.text
    });

    try {
      await this.messageRepository.save(editedMessagetoBeSaved);
    } catch (error) {
      // Handle any error that may occur during saving
      console.error("Error saving message:", error);
    }
  }
}

export default EditMessageUseCase;
