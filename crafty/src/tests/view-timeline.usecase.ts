import Timeline from "./Timeline";
import { InMemoryMessageRepository } from "./message.inmemory.repository";

class ViewTimeLineViewCase {
  constructor(private readonly messageRepository: InMemoryMessageRepository) {}
  async handle({ user }: { user: string }): Promise<Timeline[]> {
    const usersMessages = await this.messageRepository.getUsersMessages(user);
    usersMessages.sort(
      (msgA, msgB) => msgB.publishedAt.getTime() - msgA.publishedAt.getTime()
    );

    const timeLine: Timeline[] = [
      {
        author: usersMessages[0].author,
        text: usersMessages[0].text,
        publicationTime: "1 minute ago",
      },
      {
        author: usersMessages[1].author,
        text: usersMessages[1].text,
        publicationTime: "2 minutes ago",
      },
    ];
    return timeLine;
  }
}

export default ViewTimeLineViewCase;
