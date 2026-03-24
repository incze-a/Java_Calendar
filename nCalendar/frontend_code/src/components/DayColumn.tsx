// components/DayColumn.tsx
import React from "react";
import { DaySchedule } from "../types/types";
import TimeBlock from "./TimeBlock";
import { timeToPixels } from "../utils/timeUtils";

const DayColumn: React.FC<{ day: DaySchedule }> = ({ day }) => {
    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#f9f9f9",
                border: "1px solid #ccc",
                borderRadius: "8px",
                position: "relative",   // important for absolute positioning of blocks
                minHeight: `${(20-8) * 50}px`, // total day height
            }}
        >
            <h3 style={{ textAlign: "center", margin: "5px 0" }}>
                {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
            </h3>

            {day.blocks.map((block) => {
                const top = timeToPixels(block.startTime);
                const height = timeToPixels(block.endTime) - top;

                return (
                    <TimeBlock key={block.id} block={block} top={top} height={height} />
                );
            })}
        </div>
    );
};

export default DayColumn;