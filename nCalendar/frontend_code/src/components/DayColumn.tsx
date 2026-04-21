import React from "react";
import TimeBlock from "./TimeBlock";
import {timeToPixels} from "../utils/timeUtils";

// const START_HOUR=7;
// const END_HOUR=22;
// const HOUR_HEIGHT=60;
// const totalHeight=(END_HOUR-START_HOUR) * HOUR_HEIGHT;

const DayColumn: React.FC<any> = ({ day, onEmptyClick, onBlockClick }) => {
    const hours = Array.from({length: 16}, (_,i)=>i+7); // 7 - 22

    return (
        <div style={styles.column} onClick={onEmptyClick}>
            <div style={styles.header}>
                {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                })}
            </div>

            <div style={styles.body}>
                {hours.map((hour) => (
                    <div
                        key={hour}
                        style={{
                            position: "absolute",
                            top: (hour - 7) * 60, // 60px per hour
                            left: 0,
                            right: 0,
                            borderTop: "1px solid #ddd",
                            fontSize: "10px",
                            color: "#999",
                        }}
                    >
            <span style={{ position: "absolute", left: 2, top: -6 }}>
                {hour}:00
            </span>
                    </div>
                ))}

                {day.blocks.map((block: any) => {
                    const top = timeToPixels(block.startTime);
                    const height =
                        timeToPixels(block.endTime) - timeToPixels(block.startTime);

                    return (
                        <TimeBlock
                            key={block.id}
                            block={block}
                            top={top}
                            height={height}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                onBlockClick(block);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const styles: {[key: string]: React.CSSProperties} = {
    column: {
        flex: 1,
        display:"flex",
        flexDirection:"column",
        height:"100%",
        cursor: "pointer",
    },
    header: {
        textAlign: "right",
        borderBottom: "1px solid #ccc",
        fontSize:"25px",
        color:"#7c8fc4",
        flexShrink: 0,
    },
    body: {
        border: "1px solid #aaa",
        position: "relative",
        flex:1,
    },
};

export default DayColumn;