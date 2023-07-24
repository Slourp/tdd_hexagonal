import Timeline from "./Timeline";
import { InMemoryMessageRepository } from "./message.inmemory.repository";
import StubeDateProvider from "./stub-date-provider";

class ViewTimeLineViewCase {
  constructor(
    private readonly messageRepository: InMemoryMessageRepository,
    private readonly dateProvider: StubeDateProvider
  ) {}
  async handle({ user }: { user: string }): Promise<Timeline[]> {
    const usersMessages = await this.messageRepository.getUsersMessages(user);
    usersMessages.sort(
      (msgA, msgB) => msgB.publishedAt.getTime() - msgA.publishedAt.getTime()
    );

    const timeLine: Timeline[] = [
      {
        author: usersMessages[0].author,
        text: usersMessages[0].text,
        publicationTime: this.publicationTime(
          this.dateProvider.now,
          usersMessages[0].publishedAt
        ),
      },
      {
        author: usersMessages[1].author,
        text: usersMessages[1].text,
        publicationTime: this.publicationTime(
          this.dateProvider.now,
          usersMessages[1].publishedAt
        ),
      },
      {
        author: usersMessages[2].author,
        text: usersMessages[2].text,
        publicationTime: this.publicationTime(
          this.dateProvider.now,
          usersMessages[2].publishedAt
        ),
      },
    ];
    return timeLine;
  }

  private publicationTime(now: Date, publishedAt: Date) {
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
