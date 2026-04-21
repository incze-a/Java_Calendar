import React, {useState} from "react";

interface Task {
    text: string;
    completed: boolean;
}

const TaskPanel: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { text: "Laundry", completed: false },
        { text: "Call restaurant to make dinner reservation", completed: true },
        { text: "Schedule interview", completed: false },
    ]);

    const [newTaskIndex, setNewTaskIndex] = useState<number | null>(null);
    const [newText, setNewText] = useState("");

    const toggleTask = (index: number) => {
        setTasks((prev) =>
            prev.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Add new task when clicking empty space
    const handleEmptyClick = () => {
        if (newTaskIndex !== null) return; // prevent multiple inputs

        setTasks((prev) => [...prev, { text: "", completed: false }]);
        setNewTaskIndex(tasks.length);
        setNewText("");
    };

    // Save new task
    const saveNewTask = () => {
        if (newTaskIndex === null) return;

        setTasks((prev) =>
            prev.map((task, i) =>
                i === newTaskIndex ? { ...task, text: newText } : task
            )
        );

        setNewTaskIndex(null);
        setNewText("");
    };

    return (
        <div style={styles.panel} onClick={handleEmptyClick}>
            <div style={styles.header}>This week’s tasks are...</div>

            <div style={styles.list} onClick={(e) => e.stopPropagation()}>
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        style={styles.taskRow}
                        onClick={() => toggleTask(index)}
                    >
                        <div
                            style={{
                                ...styles.square,
                                backgroundColor: task.completed ? "#bbb" : "#333",
                            }}
                        />

                        {newTaskIndex === index ? (
                            <input
                                autoFocus
                                style={styles.input}
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                onBlur={saveNewTask}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveNewTask();
                                }}
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <span
                                style={{
                                    ...styles.text,
                                    color: task.completed ? "#aaa" : "#000",
                                    textDecoration: task.completed
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {task.text || "New task"}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    panel: {
        border: "1px solid #999",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        background: "linear-gradient(to right, #fdf5ac, #fdaaf6)",
        padding: "8px",
        fontSize: "14px",
        color: "#666",
    },
    list: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        cursor:"pointer",
    },
    taskRow: {
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
    },
    square: {
        width: "8px",
        height: "8px",
        marginTop: "6px",
    },
    text: {
        fontSize: "14px",
        lineHeight: "1.2",
    },
};

export default TaskPanel;