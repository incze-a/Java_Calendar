import {PIXELS_PER_HOUR} from "../constants";

//pixels to time for auto filling time
export function pixelsToTime(y: number, dayStart: number):string {
    const minutesFromStart = Math.round((y/PIXELS_PER_HOUR) * 60);

    let totalMinutes=dayStart * 60 + minutesFromStart
    const hour=Math.floor(totalMinutes /60);

    return `${hour.toString().padStart(2, "0")}:00`;
}
export function addOneHour(time: string, dayEnd: number):string{
    const [hour,minute]=time.split(":").map(Number);
    let totalMinutes=hour*60 + minute +60;
    const max = dayEnd *60;
    if (totalMinutes>max) totalMinutes=max;

    const newHour=Math.floor(totalMinutes/60);
    return `${newHour.toString().padStart(2,"0")}:00`
}

//time to pixels for block size
export function timeToPixels(time: string, dayStart: number): number {
    const [hour, minute] = time.split(":").map(Number);
    return ((hour - dayStart) * PIXELS_PER_HOUR + minute);
}

//date to day helper
export function getDayOfWeek(dateString: string):string {
    return new Date(dateString)
        .toLocaleDateString("en-US", {weekday:"long"})
        .toUpperCase();
}

//normalize time aka snap to 30
export function snapTo15(time: string, dayStart: number, dayEnd: number){
    if(!time) return time;

    const[h,m]=time.split(":").map(Number);
    let total=h*60+m;
    total = Math.round(total/15)*15

    const min=dayStart*60;
    const max=dayEnd*60;
    if(total>max) total=max;
    else if(total<min) total=min;

    const hh = Math.floor(total / 60);
    const mm = total % 60;

    return `${hh.toString().padStart(2, "0")}:${mm
        .toString()
        .padStart(2, "0")}`;
}

//date functions for automatic week loading
export function formatDateForBackend(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function getStartOfCurrentWeek(date: Date = new Date()): Date {
    const copy = new Date(date);

    const day = copy.getDay();
    // JS: Sunday = 0, Monday = 1, Tuesday = 2...
    const diffToMonday = day === 0 ? -6 : 1 - day;

    copy.setDate(copy.getDate() + diffToMonday);
    copy.setHours(0, 0, 0, 0);

    return copy;
}

export function getCurrentWeekStartString(): string {
    return formatDateForBackend(getStartOfCurrentWeek());
}

export function getTodayString(): string {
    return formatDateForBackend(new Date());
}

//helper for current day highlighting
export function isToday(dateString: string): boolean {
    const today = new Date();

    const todayString = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    return dateString === todayString;
}

//filter blocks to visible hours
export function timeToMinutes(time: string): number {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
}

export function isBlockInsideVisibleHours(
    startTime: string,
    endTime: string,
    dayStart: number,
    dayEnd: number
): boolean {
    const blockStart = timeToMinutes(startTime);
    const blockEnd = timeToMinutes(endTime);

    const visibleStart = dayStart * 60;
    const visibleEnd = dayEnd * 60;

    return blockStart >= visibleStart && blockEnd <= visibleEnd;
}


