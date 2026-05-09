import React, { useEffect, useRef, useState } from "react";
import { updateDayBounds, updateUsername, UserResponse } from "../services/api";
import {snapTo15} from "../utils/timeUtils";

interface Props {
    user: UserResponse;
    onUserUpdated: (user: UserResponse) => void;
    onLogout: () => void;
    onClose: () => void;
}

const AccountMenu: React.FC<Props> = ({
                                          user,
                                          onUserUpdated,
                                          onLogout,
                                          onClose,
                                      }) => {
    const menuRef = useRef<HTMLDivElement | null>(null);

    const [showUsernameMenu, setShowUsernameMenu] = useState(false);
    const [editingUsername, setEditingUsername] = useState(false);
    const [usernameInput, setUsernameInput] = useState(user.username);

    const [showHoursMenu, setShowHoursMenu] = useState(false);
    const [editingHours, setEditingHours] = useState(false);
    const [dayStart, setDayStart] = useState(user.userDayStart?.slice(0, 5) || "07:00");
    const [dayEnd, setDayEnd] = useState(user.userDayEnd?.slice(0, 5) || "22:00");

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

    const saveUsername = async () => {
        const trimmed = usernameInput.trim();

        if (!trimmed) {
            alert("Username cannot be empty.");
            return;
        }

        try {
            const updatedUser = await updateUsername(user.id, trimmed);

            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            onUserUpdated(updatedUser);

            setEditingUsername(false);
            setShowUsernameMenu(false);
        } catch (err: any) {
            alert("Error updating username: " + err.message);
        }
    };

    const saveHours = async () => {
        if (dayEnd <= dayStart) {
            alert("Day end must be after day start.");
            return;
        }

        try {
            const updatedUser = await updateDayBounds(user.id, dayStart, dayEnd);

            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            onUserUpdated(updatedUser);

            setEditingHours(false);
            setShowHoursMenu(false);
        } catch (err: any) {
            alert("Error updating hours: " + err.message);
        }
    };

    return (
        <div ref={menuRef} style={styles.menu}>
            <div style={styles.section}>
                <div style={styles.text}>Username:</div>
                <div
                    style={styles.clickableLine}
                    onClick={() => {
                        setShowUsernameMenu(!showUsernameMenu);
                        setShowHoursMenu(false);
                    }}
                >
                    {editingUsername ? (
                        <input
                            autoFocus
                            style={styles.input}
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") saveUsername();
                                if (e.key === "Escape") {
                                    setEditingUsername(false);
                                    setUsernameInput(user.username);
                                }
                            }}
                            onBlur={saveUsername}
                        />
                    ) : (
                        <span style={styles.text}>{user.username}</span>
                    )}
                </div>

                {showUsernameMenu && !editingUsername && (
                    <div style={styles.smallMenu}>
                        <button
                            style={styles.smallMenuButton}
                            onClick={() => {
                                setEditingUsername(true);
                                setShowUsernameMenu(false);
                            }}
                        >
                            Change username
                        </button>
                    </div>
                )}
            </div>
            <div style={styles.divider}></div>

            <div style={styles.text}>Email:</div>
            <div style={styles.text}>{user.email}</div>

            <div style={styles.divider}></div>

            <div style={styles.section}>
                <div style={styles.text}>Schedule hours:</div>
                <div
                    style={styles.clickableLine}
                    onClick={() => {
                        setShowHoursMenu(!showHoursMenu);
                        setShowUsernameMenu(false);
                    }}
                >
                    {editingHours ? (
                        <div style={styles.hoursEdit} onClick={(e) => e.stopPropagation()}>
                            <input
                                type="time"
                                style={styles.timeInput}
                                value={dayStart}
                                onChange={(e) => setDayStart(snapTo15(e.target.value, Number(user.userDayStart), Number(user.userDayEnd)))}
                            />
                            <span>–</span>
                            <input
                                type="time"
                                style={styles.timeInput}
                                value={dayEnd}
                                onChange={(e) => setDayEnd(snapTo15(e.target.value, Number(user.userDayStart), Number(user.userDayEnd)))}
                            />
                            <button style={styles.saveButton} onClick={saveHours}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <span style={styles.hours}>
              {user.userDayStart?.slice(0, 5)} – {user.userDayEnd?.slice(0, 5)}
            </span>
                    )}
                </div>

                {showHoursMenu && !editingHours && (
                    <div style={styles.smallMenu}>
                        <button
                            style={styles.smallMenuButton}
                            onClick={() => {
                                setEditingHours(true);
                                setShowHoursMenu(false);
                            }}
                        >
                            Change hours
                        </button>
                    </div>
                )}
            </div>

            <div style={styles.divider}/>

            <button
                style={styles.logout}
                onClick={() => {
                    const confirmed = window.confirm("Are you sure you want to log out?");

                    if (confirmed) {
                        onLogout();
                    }
                }}
            >
                Log Out
            </button>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    menu: {
        cursor: "default",
        position: "absolute",
        top: "34px",
        right: 0,
        width: "250px",
        backgroundColor: "#fff",
        border: "1px solid #aaa",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 1000,
    },
    section: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    clickableLine: {
        cursor: "pointer",
    },
    text: {
        fontSize:"16px",
    },
    username: {
        fontWeight: "bold",
        fontSize: "16px",
    },
    email: {
        fontSize: "13px",
        color: "#666",
        cursor: "default",
    },
    hours: {
        fontSize: "14px",
        color: "#444",
    },
    smallMenu: {
        marginLeft: "8px",
        fontSize: "12px",
    },
    smallMenuButton: {
        border: "none",
        background: "transparent",
        color: "#666",
        cursor: "pointer",
        padding: 0,
    },
    input: {
        width: "100%",
        border: "none",
        borderBottom: "1px solid #aaa",
        outline: "none",
        fontSize: "15px",
    },
    hoursEdit: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        flexWrap: "wrap",
    },
    timeInput: {
        padding: "4px",
        border: "1px solid #aaa",
        borderRadius: "6px",
    },
    saveButton: {
        border: "none",
        borderRadius: "6px",
        padding: "5px 8px",
        cursor: "pointer",
        background: "linear-gradient(to right, #fdf5ac, #fdaaf6)",
    },
    divider: {
        height: "1px",
        backgroundColor: "#ddd",
        margin: "4px 0",
    },

    logout: {
        border: "none",
        background: "transparent",
        color: "blue",
        textDecoration:"underline",
        textAlign:"center",
        cursor: "pointer",
        fontSize: "14px",
        padding: 0,
    },
};

export default AccountMenu;