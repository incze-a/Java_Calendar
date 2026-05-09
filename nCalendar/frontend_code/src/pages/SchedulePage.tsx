import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DayColumn from "../components/DayColumn";
import TaskPanel from "../components/TaskPanel";
import AddEventModal from "../components/AddEventModal";
import EditEventModal from "../components/EditEventModal";
import {getWeekSchedule, UserResponse} from "../services/api";
import Display from "../components/Display";
import { getCurrentWeekStartString } from "../utils/timeUtils";

interface Props {
    currentUser: UserResponse;
    onUserUpdated: (user: UserResponse) => void;
    onLogout: () => void;
}

const SchedulePage: React.FC<Props> = ({ currentUser, onLogout, onUserUpdated }) => {
    const [week, setWeek] = useState<any[]>([]);
    const [showAdd, setShowAdd] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedBlock, setSelectedBlock] = useState<any>(null);
    //states for default times
    const [defaultStartTime, setDefaultStartTime]=useState("");
    const [defaultEndTime, setDefaultEndTime]=useState("");

    const loadWeek = async () => {
        const currentWeekStart = getCurrentWeekStartString();
        const data = await getWeekSchedule(currentWeekStart, currentUser.id);

        if (Array.isArray(data)) {
            setWeek(data);
        } else {
            console.error("Expected week array, got:", data);
            setWeek([]);
        }
    };
    const refreshAndClose=()=>{
        loadWeek();
        setShowAdd(false);
    };

    useEffect(() => {
        loadWeek();
    }, []);

    return (
        <div>
            <Navbar
                currentUser={currentUser}
                onUserUpdated={onUserUpdated}
                onLogout={onLogout}
            />
            <div style={styles.container}>
                {/* WHAT'S ON THE LEFT */}
                <div style={styles.schedule}>
                    {week.map((day: any) => (
                        <DayColumn
                            dayStart={Number(currentUser.userDayStart.slice(0,2))}
                            dayEnd={Number(currentUser.userDayEnd.slice(0,2))}
                            key={day.date}
                            day={day}
                            onEmptyClick={(clickedDay: any, startTime: string, endTime: string) => {
                                setSelectedDay(clickedDay);
                                setDefaultStartTime(startTime);
                                setDefaultEndTime(endTime);
                                setShowAdd(true);
                            }}
                            onBlockClick={(block: any, clickedDay: any) => {
                                setSelectedBlock(block);
                                setSelectedDay(clickedDay);
                            }}                        />
                    ))}
                </div>

                {/* TASKS AND DISPLAY ON THE RIGHT */}
                <div style={styles.rightColumn}>
                    <div style={styles.displayBox}>
                        <Display username={currentUser.username}/>
                    </div>
                    <TaskPanel userId={currentUser.id}/>

                </div>

            </div>

            {/* MODALS */}
            {showAdd && selectedDay && (
                <AddEventModal
                    userDayStart={Number(currentUser.userDayStart)}
                    userDayEnd={Number(currentUser.userDayEnd)}
                    userId={currentUser.id}
                    day={selectedDay}
                    defaultStartTime={defaultStartTime}
                    defaultEndTime={defaultEndTime}
                    onAdded={() => refreshAndClose()}
                    onClose={()=>setShowAdd(false)}
                />
            )}

            {selectedBlock && selectedDay && (
                <EditEventModal
                    userDayStart={Number(currentUser.userDayStart)}
                    userDayEnd={Number(currentUser.userDayEnd)}
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