import React, { useState } from "react";
import { addBlock, addEvent } from "../services/api";
import {getDayOfWeek} from "../utils/timeUtils";

interface Props {
    onAdded: () => void; // callback to refresh calendar
}

const AddEventForm: React.FC<Props> = ({ onAdded }) => {
    const [title, setTitle] = useState("");
    const [day, setDay] = useState("MONDAY");
    const [startTime, setStartTime] = useState("08:00");
    const [endTime, setEndTime] = useState("09:00");
    const [color, setColor] = useState("#e03674");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addBlock({ title, dayOfWeek: day, startTime, endTime, color });
            onAdded();
            setTitle(""); // clear form
        } catch (err: any) {
            alert("Error: " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
            <input type="color" value={color} onChange={e => setColor(e.target.value)} />
            <select value={day} onChange={e => setDay(e.target.value)}>
                <option value="MONDAY">Monday</option>
                <option value="TUESDAY">Tuesday</option>
                <option value="WEDNESDAY">Wednesday</option>
                <option value="THURSDAY">Thursday</option>
                <option value="FRIDAY">Friday</option>
                <option value="SATURDAY">Saturday</option>
                <option value="SUNDAY">Sunday</option>
            </select>
            <button type="submit">Add Event</button>
        </form>
    );
};

export default AddEventForm;