import React from "react";
import TimeBlock from "./TimeBlock";
import {timeToPixels, pixelsToTime, addOneHour, isToday, isBlockInsideVisibleHours} from "../utils/timeUtils";
import {PIXELS_PER_HOUR} from "../constants";

const HEADER_HEIGHT = 35;

interface Props {
    day: any;
    dayStart: number;
    dayEnd: number;
    onEmptyClick: (day: any, startTime: string, endTime: string) => void;
    onBlockClick: (block: any, day: any) => void;
}

const DayColumn: React.FC<Props> = ({
                                        day,
                                        dayStart,
                                        dayEnd,
                                        onEmptyClick,
                                        onBlockClick,
                                    }) => {
    const totalHeight = (dayEnd - dayStart) * PIXELS_PER_HOUR + HEADER_HEIGHT;

    const hours = Array.from({length: dayEnd-dayStart}, (_,i)=>i+dayStart);
    const todayColumn = isToday(day.date);

    return (
        <div style={{
            ...styles.column,
            height: totalHeight,
        }}>
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

                const startTime = pixelsToTime(y, dayStart);
                const endTime = addOneHour(startTime, dayEnd);

                onEmptyClick(day, startTime, endTime);
            }}>
                {hours.map((hour) => (
                    <div
                        key={hour}
                        style={{
                            position: "absolute",
                            top: (hour - dayStart) * PIXELS_PER_HOUR,
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

                {day.blocks
                    .filter((block: any) =>
                        isBlockInsideVisibleHours(
                            block.startTime,
                            block.endTime,
                            dayStart,
                            dayEnd
                        )
                    )
                    .map((block: any) => {
                        const top = timeToPixels(block.startTime, dayStart);
                    const height =
                        timeToPixels(block.endTime, dayStart) - timeToPixels(block.startTime, dayStart) - 10;

                    return (
                        <TimeBlock
                            key={block.id}
                            block={block}
                            top={top}
                            height={height}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                onBlockClick(block, day);
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