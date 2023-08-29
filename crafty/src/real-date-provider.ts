import DateProvider from "./application/IDateProvider";

class RealDateProvider implements DateProvider {
    getNow(): Date {
        return new Date();
    }
}

export default RealDateProvider