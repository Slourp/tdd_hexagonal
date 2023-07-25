import Message from "./Message";

export const messageBuilder = ({
  id = "message-id",
  author = "Alice",
  text = "SomeTest",
  publishedAt = new Date("2023-02-08T15:00:00.000Z"),
}: {
  id?: string;
  author?: string;
  text?: string;
  publishedAt?: Date;
} = {}) => {
  const props = {
    id,
    author,
    text,
    publishedAt,
  };

  return {
    withId: (_id: string) => messageBuilder({ ...props, id: _id }),
    withAuthor: (_author: string) =>
      messageBuilder({ ...props, author: _author }),
    withText: (_text: string) => messageBuilder({ ...props, text: _text }),
    withPublishedAt: (_publishedAt: Date) =>
      messageBuilder({ ...props, publishedAt: _publishedAt }),
    build: (): Message => ({
      id: props.id,
      author: props.author,
      text: props.text,
      publishedAt: props.publishedAt,
    }), // This is optional, it returns the final message object without any additional modifications.
  };
};
