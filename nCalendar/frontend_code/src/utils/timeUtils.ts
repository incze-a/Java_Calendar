import {DAY_START_HOUR, HOUR_HEIGHT} from "../constants";

export function timeToPixels(time: string) {
    const [hour, minute] = time.split(":").map(Number);
    return (hour + minute / 60 - DAY_START_HOUR) * HOUR_HEIGHT ; // 8 is DAY_START_HOUR, 50 px/hour
}