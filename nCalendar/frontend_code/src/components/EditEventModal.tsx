import React, { useState } from "react";
import {
    updateBlock,
    updateEvent,
    deleteBlock,
    deleteEvent,
} from "../services/api";
import { snapTo15, getDayOfWeek } from "../utils/timeUtils";

interface Props {
    day: any;
    onAdded: () => void;
    onClose?: () => void;
    block: any;
    userDayStart: number;
    userDayEnd: number;
}

const EditEventModal: React.FC<Props> = ({
                                             day,
                                             onClose,
                                             onAdded,
                                             block,
    userDayStart,
    userDayEnd,
                                         }) => {
    const [title, setTitle] = useState(block.title || "");
    const [startTime, setStartTime] = useState(block.startTime || "");
    const [endTime, setEndTime] = useState(block.endTime || "");
    const [recurring, setRecurring] = useState(block.type === "Recurring");
    const [color, setColor] = useState(block.color || "#ff6b81");

    const handleEdit = async () => {
        try {
            if (recurring) {
                await updateBlock(block.id, {
                    title,
                    dayOfWeek: getDayOfWeek(day.date),
                    startTime,
                    endTime,
                    color,
                });
            } else {
                await updateEvent(block.id, {
                    title,
                    date: day.date,
                    startTime,
                    endTime,
                    color,
                });
            }

            onAdded();
            onClose?.();
        } catch (err: any) {
            alert("Error: " + err.message);
        }
    };

    const handleRemove = async () => {
        try {
            const confirmed = window.confirm(
                `Are you sure you want to remove "${block.title}"?`
            );

            if (!confirmed) return;

            if (block.type === "Recurring") {
                await deleteBlock(block.id);
            } else {
                await deleteEvent(block.id);
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
                            onChange={(e) => setStartTime(snapTo15(e.target.value, userDayStart, userDayEnd))}
                        />
                    </div>

                    <div style={styles.column}>
                        <label style={styles.label}>End Time</label>
                        <input
                            type="time"
                            style={styles.smallInput}
                            value={endTime}
                            onChange={(e) => setEndTime(snapTo15(e.target.value, userDayStart, userDayEnd))}
                        />
                    </div>
                </div>

                {/*<div style={styles.checkboxRow}>*/}
                {/*    <input*/}
                {/*        type="checkbox"*/}
                {/*        checked={recurring}*/}
                {/*        onChange={() => setRecurring(!recurring)}*/}
                {/*    />*/}
                {/*    <span>Recurring</span>*/}
                {/*</div>*/}

                <label style={styles.label}>Color</label>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />

                <div style={styles.row}>
                    <div style={styles.column}>
                        <button style={styles.button} onClick={handleEdit}>
                            EDIT
                        </button>
                    </div>

                    <div style={styles.column}>
                        <button
                            style={{ ...styles.button, backgroundColor: "#c94c4c" }}
                            onClick={handleRemove}
                        >
                            REMOVE
                        </button>
                    </div>
                </div>

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

export default EditEventModal;