import React, {useState} from "react";
import {addBlock, addEvent} from "../services/api";
import {getDayOfWeek, snapTo15} from "../utils/timeUtils";

interface Props {
    day: any,
    defaultStartTime?: string,
    defaultEndTime?: string,
    onAdded: () => void,
    onClose?: () => void,
}



const AddEventModal: React.FC<Props> = ({day,
                                            defaultEndTime="",
                                            defaultStartTime="",
                                            onClose, onAdded}) => {
    const [title, setTitle] = useState("New Block");
    const [startTime, setStartTime] = useState(defaultStartTime);
    const [endTime, setEndTime] = useState(defaultEndTime);
    const [recurring, setRecurring] = useState(false);
    const [color, setColor] = useState("");

    const handleSubmit = async () => {
        console.log("STRUCTURE RECEIVED:", day);
        console.log("DATE:", day.date);
        console.log("DAY OF WEEK:", getDayOfWeek(day.date));

        try {
            if (recurring) {
                await addBlock({
                    title,
                    dayOfWeek: getDayOfWeek(day.date),
                    startTime,
                    endTime,
                    color: color || "#fd65c2",
                });
            } else {
                await addEvent({
                    title,
                    date: day.date,
                    startTime,
                    endTime,
                    color: color || "#bffd71",
                });
            }

            onAdded();
            onClose?.();
        } catch (err: any) {
            alert("Error: " + err.message);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.row}>
                    <div style={styles.column}>
                <label style={styles.label}>Title</label>
                <input
                    style={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>
            </div>

                <div style={styles.row}>
                    <div style={styles.column}>
                        <label style={styles.label}>Start Time</label>
                        <input
                            type="time"
                            style={styles.smallInput}
                            value={startTime}
                            onChange={(e) => setStartTime(snapTo15(e.target.value))}
                        />
                    </div>

                    <div style={styles.column}>
                        <label style={styles.label}>End Time</label>
                        <input
                            type="time"
                            style={styles.smallInput}
                            value={endTime}
                            onChange={(e) => setEndTime(snapTo15(e.target.value))}
                        />
                    </div>
                </div>

                <div style={styles.checkboxRow}>
                    <input
                        type="checkbox"
                        checked={recurring}
                        onChange={() => setRecurring(!recurring)}
                    />
                    <span>Recurring</span>
                </div>

                <label style={styles.label}>Color</label>
                <input type="color" value={color} onChange={e => setColor(e.target.value)}/>


                <button style={styles.button} onClick={handleSubmit}>
                    ADD EVENT
                </button>

                <span style={styles.cancel} onClick={onClose}>
                    Cancel
                </span>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#fdfdfd",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    label: {
        fontSize: "18px",
    },
    input: {
        width: "95%",
        padding: "12px",
        borderRadius: "15px",
        border: "1px solid black",
        fontSize: "16px",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        gap:"10px",
        flex: 1,
    },
    smallInput: {
        padding: "10px",
        borderRadius: "15px",
        border: "1px solid black",
        fontSize: "16px",
    },
    checkboxRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "18px",
    },
    colorInput: {
        width: "60%",
        padding: "10px",
        borderRadius: "15px",
        border: "1px solid black",
        fontSize: "16px",
    },
    button: {
        marginTop: "10px",
        padding: "15px",
        border: "none",
        borderRadius: "20px",
        fontSize: "18px",
        cursor: "pointer",
        background: "linear-gradient(to right, #fdf5ac, #fdaaf6)",
    },
    cancel: {
        textAlign: "center",
        color: "blue",
        textDecoration: "underline",
        cursor: "pointer",
        marginTop: "5px",
    },
};

export default AddEventModal;