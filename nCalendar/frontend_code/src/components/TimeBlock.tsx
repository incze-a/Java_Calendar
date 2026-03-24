// components/TimeBlock.tsx
import React from "react";
import { TimeBlock as TimeBlockType } from "../types/types";

const TimeBlock: React.FC<{ block: TimeBlockType; top: number; height: number }> = ({ block, top, height }) => {
    return (
        <div
            style={{
                position: "absolute",
                top: `${top}px`,
                height: `${height}px`,
                left: "5px",
                right: "5px",
                backgroundColor: block.color || "#e03674",
                color: "white",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "12px",
                fontWeight: "bold",
            }}
        >
            <div>{block.title}</div>
            <div style={{ fontSize: "10px" }}>
                {block.startTime} - {block.endTime}
            </div>
        </div>
    );
};

export default TimeBlock;