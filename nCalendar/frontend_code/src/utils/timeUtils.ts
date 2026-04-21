import {DAY_START_HOUR, HOUR_HEIGHT} from "../constants";
/*
export function timeToPixels(time: string) {
    const [hour, minute] = time.split(":").map(Number);
    return (hour + minute / 60 - DAY_START_HOUR) * HOUR_HEIGHT ; // 8 is DAY_START_HOUR, 50 px/hour
}
*/
export const DAY_START = 7;   // 07:00
export const DAY_END = 22;    // 22:00
export const PIXELS_PER_HOUR = 60;

export function timeToPixels(time: string): number {
    const [hour, minute] = time.split(":").map(Number);
    return ((hour - DAY_START) * 60 + minute) * (PIXELS_PER_HOUR / 60);
}