import React, { useEffect, useState } from "react";
import { getWeekSchedule } from "../services/api";
import { DaySchedule } from "../types/types";
import DayColumn from "./DayColumn";

const Calendar: React.FC = () => {
    const [week, setWeek] = useState<DaySchedule[]>([]);

    useEffect(() => {
        getWeekSchedule("2026-03-16").then(setWeek);
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Weekly Schedule</h1>
            <div style={{ display: "flex", gap: "10px" }}>
                {week.map((day) => (
                    <DayColumn key={day.date} day={day} />
                ))}
            </div>
        </div>
    );
};

export default Calendar;