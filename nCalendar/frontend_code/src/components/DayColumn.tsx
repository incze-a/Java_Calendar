import React from "react";
import { DaySchedule } from "../types/types";
import TimeBlock from "./TimeBlock";

const DayColumn: React.FC<{ day: DaySchedule }> = ({ day }) => {
    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#f9f9f9",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                minHeight: "250px",
            }}
        >
            <h3 style={{ textAlign: "center", marginBottom: "5px" }}>
                {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
            </h3>
            <p style={{ textAlign: "center", color: "#777", fontSize: "12px", marginBottom: "10px" }}>
                {day.date}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {day.blocks.length > 0 ? (
                    day.blocks.map((block) => <TimeBlock key={block.id} block={block} />)
                ) : (
                    <p style={{ textAlign: "center", color: "#aaa", fontSize: "12px" }}>No events</p>
                )}
            </div>
        </div>
    );
};

export default DayColumn;