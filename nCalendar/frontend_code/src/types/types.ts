export interface TimeBlock {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    color: string;
    type: string;
}

export interface DaySchedule {
    date: string;
    blocks: TimeBlock[];
}