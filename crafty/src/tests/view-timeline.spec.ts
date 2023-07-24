import Message from "./Message";
import Timeline from "./Timeline";
import { InMemoryMessageRepository } from "./message.inmemory.repository";
import StubeDateProvider from "./stub-date-provider";
import ViewTimeLineViewCase from "./view-timeline.usecase";

describe("Feature: Viewing a personnal timeline", () => {
  let fixture: Fixture;

  beforeEach(() => (fixture = createFixture()));

  const publicationTime = (now: Date, publishedAt: Date) => {
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
  };

  describe("Rule: Message are shown in reverse chronologic", () => {
    test("Alice can view 3 messages she has published on her timeline", async () => {
      await fixture.givenTheFollowingMessagesExist([
        {
          author: "Alice",
          text: "My first message",
          id: "message-1",
          publishedAt: new Date("2023-02-07T16:28:00.000Z"),
        },
        {
          author: "Bob",
          text: "Hi it's Bob",
          id: "message-2",
          publishedAt: new Date("2023-02-07T16:29:00.000Z"),
        },
        {
          author: "Alice",
          text: "Hi, how are you all ?",
          id: "message-3",
          publishedAt: new Date("2023-02-07T16:30:00.000Z"),
        },
        {
          author: "Alice",
          text: "My last message",
          id: "message-4",
          publishedAt: new Date("2023-02-07T16:30:30.000Z"),
        },
      ]);

      fixture.givenNowIs(new Date("2023-02-07T16:31:00.000Z"));

      fixture.whenUserSeesAlicesTimeLine("Aline");

      fixture.thenUserShouldSees([
        {
          author: "Alice",
          text: "My last message",
          publicationTime: "Less than a minute ago",
        },
        {
          author: "Alice",
          text: "Hi, how are you all ?",
          publicationTime: "1 minute ago",
        },
        {
          author: "Alice",
          text: "My first message",
          publicationTime: "3 minutes ago",
        },
      ]);
    });
    test("PublicationTime", () => {
      it("should return 'less than a minute ago' when the publication date is inferior to one minute ago", () => {
        const now = new Date("2023-02-16T10:57:00.000Z");
        const publishedAt = new Date("2023-02-16T10:56:30.000Z");

        const text = publicationTime(now, publishedAt);

        expect(text).toEqual("less than a minute ago");
      });
      it("should return  '1 minute ago' when the publication date is exactly 1 minute ago", () => {
        const now = new Date("2023-02-16T10:57:00.000Z");
        const publishedAt = new Date("2023-02-16T10:56:30.000Z");

        const text = publicationTime(now, publishedAt);

        expect(text).toEqual("less than a minute ago");
      });

      it("should return  '1 minutes ago' when the publication date is exactly under 2 minutes ago", () => {
        const now = new Date("2023-02-16T10:57:00.000Z");
        const publishedAt = new Date("2023-02-16T10:55:01.000Z");

        const text = publicationTime(now, publishedAt);

        expect(text).toEqual("1 minute ago");
      });

      it("should return  '2 minutes ago' when the publication date is between 2 minutes ago and  2 minutes 59 sec ago", () => {
        const now = new Date("2023-02-16T10:57:00.000Z");
        const publishedAt = new Date("2023-02-16T10:55:00.000Z");

        const text = publicationTime(now, publishedAt);

        expect(text).toEqual("2 minutes ago");
      });

      it("should return  'X minutes ago' when the publication date is between X minutes ago and  X minutes 59 sec ago", () => {
        const now = new Date("2023-02-16T10:57:00.000Z");
        const publishedAt = new Date("2023-02-16T10:55:00.000Z");

        const text = publicationTime(now, publishedAt);

        expect(text).toEqual("5 minutes ago");
      });
    });
  });
});

const createFixture = () => {
  const messageRepository = new InMemoryMessageRepository();
  const dateProvider = new StubeDateProvider();
  const viewTimeLineViewCase = new ViewTimeLineViewCase(
    messageRepository,
    dateProvider
  );
  let timeline: Timeline[];

  return {
    async givenTheFollowingMessagesExist(messages: Message[]) {
      messageRepository.givenExistingMessages(messages);
    },

    givenNowIs(now: Date) {
      dateProvider.now = now;
    },

    async whenUserSeesAlicesTimeLine(user: string) {
      await viewTimeLineViewCase.handle({ user });
    },
    thenUserShouldSees(expectedTimeline: Timeline[]) {
      expect(timeline).toEqual(expectedTimeline);
    },
  };
};

type Fixture = ReturnType<typeof createFixture>;
