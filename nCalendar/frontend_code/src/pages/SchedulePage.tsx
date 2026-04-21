import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DayColumn from "../components/DayColumn";
import TaskPanel from "../components/TaskPanel";
import AddEventModal from "../components/AddEventModal";
import EditEventModal from "../components/EditEventModal";
import { getWeekSchedule } from "../services/api";
import Display from "../components/Display";

const SchedulePage: React.FC = () => {
    const [week, setWeek] = useState<any[]>([]);
    const [showAdd, setShowAdd] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedBlock, setSelectedBlock] = useState<any>(null);

    const refreshWeek=()=>{
        getWeekSchedule("2026-03-16").then(setWeek);
    };
    const refreshAndClose=()=>{
        refreshWeek();
        setShowAdd(false);
    };

    useEffect(() => {
        refreshWeek();
    }, []);

    return (
        <div>
            <Navbar />

            <div style={styles.container}>
                {/* LEFT: SCHEDULE */}
                <div style={styles.schedule}>
                    {week.map((day: any) => (
                        <DayColumn
                            key={day.date}
                            day={day}
                            onEmptyClick={() => {
                                setSelectedDay(day.date);
                                setShowAdd(true);
                            }}
                            onBlockClick={(block: any) => setSelectedBlock(block)}
                        />
                    ))}
                </div>

                {/* RIGHT: TASKS */}
                <div style={styles.rightColumn}>
                    <div style={styles.displayBox}>
                        <Display/>
                    </div>
                    <TaskPanel/>

                </div>

            </div>

            {/* MODALS */}
            {showAdd && (
                <AddEventModal
                    day={selectedDay}
                    onAdded={() => refreshAndClose()}
                    onClose={()=>setShowAdd(false)}
                />
            )}

            {selectedBlock && (
                <EditEventModal
                    day={selectedDay}
                    onAdded={refreshAndClose}
                    block={selectedBlock}
                    onClose={() => setSelectedBlock(null)}
                />
            )}
        </div>
    );
};

const styles:{[key:string]:React.CSSProperties} = {
    container: {
        display: "flex",
        padding: "20px",
        gap: "15px",
        height:"85vh",
    },
    schedule: {
        display: "flex",
        flex: 3,
        overflow:"auto",
    },
    rightColumn:{
        flex: 1,
        display:"flex",
        flexDirection:"column",
        gap:"1rem",
        height:"100%"
    },
    displayBox: {
        height:"250px",
        width:"100%",
        flexShrink: 0,
    },
};

export default SchedulePage;