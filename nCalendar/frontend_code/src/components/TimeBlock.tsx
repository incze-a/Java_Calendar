import React from "react";
import { TimeBlock as TimeBlockType } from "../types/types";

const TimeBlock: React.FC<{ block: TimeBlockType }> = ({ block }) => {
    return (
        <div
            style={{
                backgroundColor: block.color || "#e74c3c",
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