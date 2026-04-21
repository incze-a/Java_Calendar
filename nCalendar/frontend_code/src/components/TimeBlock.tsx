import React from "react";

const TimeBlock: React.FC<any> = ({ block, top, height, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                position: "absolute",
                top: top,
                height: height,
                left: "1px",
                right: "1px",
                backgroundColor: block.color,
                borderRadius: "6px",
                padding: "5px",
                color: "white",
                fontSize: "12px",
                cursor: "pointer",
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