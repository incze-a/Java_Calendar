import React, { useEffect, useState } from "react";
import {
    addTask,
    deleteTask,
    getTasksForWeek,
    updateTask,
} from "../services/api";
import { getTodayString, getCurrentWeekStartString } from "../utils/timeUtils";

interface Task {
    id: number;
    text: string;
    completed: boolean;
    date?: string;
    completedDate?: string;
}

interface Props {
    userId: number;
}

const TaskPanel: React.FC<Props> = ({userId}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newText, setNewText] = useState("");

    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");

    const weekDate = getCurrentWeekStartString();
    const todayDate = getTodayString();

    const loadTasks = async () => {
        try {
            const data = await getTasksForWeek(weekDate, userId);

            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.error("Expected tasks array, got:", data);
                setTasks([]);
            }
        } catch (err: any) {
            alert("Error loading tasks: " + err.message);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleEmptyClick = () => {
        setSelectedTaskId(null);
        setEditingTaskId(null);
        setNewText("");
        setIsAdding(true);
    };

    const saveNewTask = async () => {
        const trimmed = newText.trim();

        if (!trimmed) {
            setIsAdding(false);
            setNewText("");
            return;
        }

        try {
            await addTask({
                text: trimmed,
                completed: false,
                date: todayDate,
            },
                userId);

            setNewText("");
            setIsAdding(false);
            await loadTasks();
        } catch (err: any) {
            alert("Error creating task: " + err.message);
        }
    };

    const handleComplete = async (task: Task) => {
        try {
            await updateTask(task.id, {
                text: task.text,
                completed: true,
                date: task.date,
            });

            setSelectedTaskId(null);
            await loadTasks();
        } catch (err: any) {
            alert("Error completing task: " + err.message);
        }
    };

    const handleReopen = async (task: Task) => {
        try {
            await updateTask(task.id, {
                text: task.text,
                completed: false,
                date: task.date,
            });

            setSelectedTaskId(null);
            await loadTasks();
        } catch (err: any) {
            alert("Error reopening task: " + err.message);
        }
    };

    const startEditing = (task: Task) => {
        setEditingTaskId(task.id);
        setEditText(task.text);
        setSelectedTaskId(null);
    };

    const saveEdit = async (task: Task) => {
        const trimmed = editText.trim();

        if (!trimmed) {
            setEditingTaskId(null);
            setEditText("");
            return;
        }

        try {
            await updateTask(task.id, {
                text: trimmed,
                completed: task.completed,
                date: task.date,
            });

            setEditingTaskId(null);
            setEditText("");
            await loadTasks();
        } catch (err: any) {
            alert("Error editing task: " + err.message);
        }
    };

    const handleRemove = async (task: Task) => {
        try {
            const confirmed = window.confirm(`Remove task "${task.text}"?`);

            if (!confirmed) return;

            await deleteTask(task.id);

            setSelectedTaskId(null);
            await loadTasks();
        } catch (err: any) {
            alert("Error removing task: " + err.message);
        }
    };

    return (
        <div style={styles.panel} onClick={handleEmptyClick}>
            <div style={styles.header}>This week’s tasks are...</div>

            <div style={styles.list}>
                {tasks.map((task) => (
                    <div key={task.id} style={styles.taskWrapper}>
                        <div
                            style={styles.taskRow}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTaskId(
                                    selectedTaskId === task.id ? null : task.id
                                );
                            }}
                        >
                            <div
                                style={{
                                    ...styles.square,
                                    backgroundColor: task.completed ? "#bbb" : "#333",
                                }}
                            />

                            {editingTaskId === task.id ? (
                                <input
                                    autoFocus
                                    style={styles.input}
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    onBlur={() => saveEdit(task)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") saveEdit(task);
                                        if (e.key === "Escape") {
                                            setEditingTaskId(null);
                                            setEditText("");
                                        }
                                    }}
                                />
                            ) : (
                                <span
                                    style={{
                                        ...styles.text,
                                        color: task.completed ? "#999" : "#000",
                                        textDecoration: task.completed ? "line-through" : "none",
                                    }}
                                >
                  {task.text}
                </span>
                            )}
                        </div>

                        {selectedTaskId === task.id && editingTaskId !== task.id && (
                            <div style={styles.menu} onClick={(e) => e.stopPropagation()}>
                                {task.completed ? (
                                    <button
                                        style={styles.menuButton}
                                        onClick={() => handleReopen(task)}
                                    >
                                        Reopen
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            style={styles.menuButton}
                                            onClick={() => handleComplete(task)}
                                        >
                                            Complete
                                        </button>

                                        <span style={styles.separator}>|</span>

                                        <button
                                            style={styles.menuButton}
                                            onClick={() => startEditing(task)}
                                        >
                                            Edit
                                        </button>

                                        <span style={styles.separator}>|</span>

                                        <button
                                            style={styles.menuButton}
                                            onClick={() => handleRemove(task)}
                                        >
                                            Remove
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {isAdding && (
                    <div
                        style={styles.taskRow}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={styles.square} />

                        <input
                            autoFocus
                            style={styles.input}
                            value={newText}
                            placeholder="New task..."
                            onChange={(e) => setNewText(e.target.value)}
                            onBlur={() => {
                                if (!newText.trim()) {
                                    setIsAdding(false);
                                    setNewText("");
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") saveNewTask();
                                if (e.key === "Escape") {
                                    setIsAdding(false);
                                    setNewText("");
                                }
                            }}
                        />
                    </div>
                )}
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
        backgroundColor: "#fff",
        cursor: "text",
        overflow: "hidden",
        minWidth: 0,
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
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        minWidth: 0,
    },
    taskWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        maxWidth: "100%",
        minWidth: 0,
    },
    taskRow: {
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: "pointer",
        maxWidth: "100%",
        minWidth: 0,
    },
    square: {
        width: "8px",
        height: "8px",
        marginTop: "6px",
        backgroundColor: "#333",
        flexShrink: 0,
    },
    text: {
        fontSize: "14px",
        lineHeight: "1.2",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        whiteSpace: "normal",
        flex: 1,
        minWidth: 0,
    },
    input: {
        flex: 1,
        border: "none",
        borderBottom: "1px solid #aaa",
        outline: "none",
        fontSize: "14px",
        backgroundColor: "transparent",
    },
    menu: {
        marginLeft: "16px",
        fontSize: "12px",
        color: "#666",
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
    menuButton: {
        border: "none",
        background: "transparent",
        color: "#666",
        cursor: "pointer",
        padding: 0,
        fontSize: "12px",
    },
    separator: {
        color: "#aaa",
    },
};

export default TaskPanel;