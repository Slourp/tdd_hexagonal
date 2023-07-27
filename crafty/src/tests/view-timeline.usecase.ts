import DateProvider from "./IDateProvider";
import IMessageRepository from "./IMessageRepository";
import Message from "./Message";
import Timeline from "./Timeline";

class ViewTimeLineViewCase {
  private readonly TIME_UNITS = {
    SECOND: "second",
    MINUTE: "minute",
    HOUR: "hour",
    DAY: "day",
    MONTH: "month",
    YEAR: "year",
  };

  private readonly TIME_IN_SECONDS = {
    MINUTE: 60,
    HOUR: 3600,
    DAY: 86400,
    MONTH: 2592000,
    YEAR: 31104000,
  };

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
      text: message.text.value,
      publicationTime: this.publicationTime(message.publishedAt),
    }));

    return timeLine;
  }

  private publicationTime(publishedAt: Date) {
    const now = this.dateProvider.getNow();
    const timeDiffInSeconds = Math.floor(
      (now.getTime() - publishedAt.getTime()) / 1000
    );

    const getFormattedTime = (value: number, unit: string) =>
      `${value} ${unit}${value === 1 ? "" : "s"} ago`;

    const { SECOND, MINUTE, HOUR, DAY, MONTH, YEAR } = this.TIME_UNITS;

    const {
      MINUTE: MINUTE_IN_SECONDS,
      HOUR: HOUR_IN_SECONDS,
      DAY: DAY_IN_SECONDS,
      MONTH: MONTH_IN_SECONDS,
      YEAR: YEAR_IN_SECONDS,
    } = this.TIME_IN_SECONDS;

    if (timeDiffInSeconds < MINUTE_IN_SECONDS) {
      return getFormattedTime(timeDiffInSeconds, SECOND);
    }
    if (timeDiffInSeconds < HOUR_IN_SECONDS) {
      return getFormattedTime(
        Math.floor(timeDiffInSeconds / MINUTE_IN_SECONDS),
        MINUTE
      );
    }
    if (timeDiffInSeconds < DAY_IN_SECONDS) {
      return getFormattedTime(
        Math.floor(timeDiffInSeconds / HOUR_IN_SECONDS),
        HOUR
      );
    }
    if (timeDiffInSeconds < MONTH_IN_SECONDS) {
      return getFormattedTime(
        Math.floor(timeDiffInSeconds / DAY_IN_SECONDS),
        DAY
      );
    }
    if (timeDiffInSeconds < YEAR_IN_SECONDS) {
      return getFormattedTime(
        Math.floor(timeDiffInSeconds / MONTH_IN_SECONDS),
        MONTH
      );
    }
    return getFormattedTime(
      Math.floor(timeDiffInSeconds / YEAR_IN_SECONDS),
      YEAR
    );
  }
}

export default ViewTimeLineViewCase;
