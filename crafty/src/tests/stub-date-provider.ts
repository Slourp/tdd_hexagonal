import DateProvider from "../application/IDateProvider";

class StubeDateProvider implements DateProvider {
  now!: Date;
  getNow(): Date {
    return this.now;
  }
}

export default StubeDateProvider;
