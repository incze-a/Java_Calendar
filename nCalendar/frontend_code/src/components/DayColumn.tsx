import React from "react";
import TimeBlock from "./TimeBlock";
import {timeToPixels, pixelsToTime, addOneHour, isToday} from "../utils/timeUtils";
import {DAY_START, DAY_END, PIXELS_PER_HOUR} from "../constants";

const totalHeight=(DAY_END-DAY_START) * PIXELS_PER_HOUR + 35; //35 to account for the header

const DayColumn: React.FC<any> = ({ day, onEmptyClick, onBlockClick }) => {
    const hours = Array.from({length: 16}, (_,i)=>i+7); // 7 - 22
    const todayColumn = isToday(day.date);

    return (
        <div style={styles.column}>
            <div style={styles.header}>
                {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
})}
</div>

            <div style={{...styles.body,
                backgroundColor: todayColumn ? "#e7e9f2" : "#f7f7f7",

            }} onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const y = e.clientY - rect.top;

                const startTime = pixelsToTime(y);
                const endTime = addOneHour(startTime);

                onEmptyClick(day, startTime, endTime);
            }}>
                {hours.map((hour) => (
                    <div
                        key={hour}
                        style={{
                            position: "absolute",
                            top: (hour - DAY_START) * PIXELS_PER_HOUR, // 60px per hour
                            left: 0,
                            right: 0,
                            borderTop: "1px solid #ddd",
                            fontSize: "10px",
                            color: "#999",
                        }}
                    >
            <span style={{position: "absolute", left: 2}}>
                {hour}:00
            </span>
                    </div>
                ))}

                {day.blocks.map((block: any) => {
                    const top = timeToPixels(block.startTime);
                    const height =
                        timeToPixels(block.endTime) - timeToPixels(block.startTime) - 10;

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

const styles: { [key: string]: React.CSSProperties} = {
    column: {
        flex: 1,
        display:"flex",
        flexDirection:"column",
        height:totalHeight,
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