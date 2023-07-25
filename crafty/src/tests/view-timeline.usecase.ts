import DateProvider from "./IDateProvider";
import IMessageRepository from "./IMessageRepository";
import Message from "./Message";
import Timeline from "./Timeline";

class ViewTimeLineViewCase {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly dateProvider: DateProvider
  ) {}
  async handle({ user }: { user: string }): Promise<Timeline[]> {
    const usersMessages = await this.messageRepository.getUsersMessages(user);
    usersMessages.sort(
      (msgA, msgB) => msgB.publishedAt.getTime() - msgA.publishedAt.getTime()
    );
    const timeLine: Timeline[] = usersMessages.map((message: Message) => ({
      author: message.author,
      text: message.text,
      publicationTime: this.publicationTime(message.publishedAt),
    }));

    return timeLine;
  }

  private publicationTime(publishedAt: Date) {
    const now = this.dateProvider.getNow();

    const timeDiffInSeconds = Math.floor(
      (now.getTime() - publishedAt.getTime()) / 1000
    );

    const lessThanMinute = (time: number) => time < 60;
    const minutesAgo = (time: number) => time < 3600;
    const hoursAgo = (time: number) => time < 86400;
    const daysAgo = (time: number) => time < 2592000;
    const monthsAgo = (time: number) => time < 5184000;
    const yearsAgo = (time: number) => time >= 5184000;

    const getFormattedTime = (value: number, unit: string) =>
      `${value} ${unit}${value === 1 ? "" : "s"} ago`;

    const lessThanMinuteOutput = (time: number) =>
      getFormattedTime(time, "minute");
    const minutesAgoOutput = (time: number) =>
      getFormattedTime(Math.floor(time / 60), "minute");
    const hoursAgoOutput = (time: number) =>
      getFormattedTime(Math.floor(time / 3600), "hour");
    const daysAgoOutput = (time: number) =>
      getFormattedTime(Math.floor(time / 86400), "day");
    const monthsAgoOutput = (time: number) =>
      getFormattedTime(Math.floor(time / 2592000), "month");
    const yearsAgoOutput = (time: number) =>
      getFormattedTime(Math.floor(time / 31104000), "year");

    if (lessThanMinute(timeDiffInSeconds)) {
      return lessThanMinuteOutput(timeDiffInSeconds);
    }
    if (minutesAgo(timeDiffInSeconds)) {
      return minutesAgoOutput(timeDiffInSeconds);
    }
    if (hoursAgo(timeDiffInSeconds)) {
      return hoursAgoOutput(timeDiffInSeconds);
    }
    if (daysAgo(timeDiffInSeconds)) {
      return daysAgoOutput(timeDiffInSeconds);
    }
    if (monthsAgo(timeDiffInSeconds)) {
      return monthsAgoOutput(timeDiffInSeconds);
    }

    return yearsAgo(timeDiffInSeconds)
      ? yearsAgoOutput(timeDiffInSeconds)
      : "Invalid time";
  }
}

export default ViewTimeLineViewCase;
