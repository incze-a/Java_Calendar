import React, { useState } from "react";
import { signupUser, UserResponse } from "../services/api";
import { snapTo15 } from "../utils/timeUtils";
import { SignupDraft } from "./SignUpModal";

interface Props {
    signupData: SignupDraft;
    onSignup: (user: UserResponse) => void;
    onBack: () => void;
}

const ChooseScheduleHoursModal: React.FC<Props> = ({
                                                       signupData,
                                                       onSignup,
                                                       onBack,
                                                   }) => {
    const [userDayStart, setUserDayStart] = useState("07:00");
    const [userDayEnd, setUserDayEnd] = useState("22:00");

    const handleCreateSchedule = async () => {
        try {
            if (userDayEnd <= userDayStart) {
                alert("Day end must be after day start.");
                return;
            }

            const user = await signupUser({
                ...signupData,
                userDayStart,
                userDayEnd,
            });

            localStorage.setItem("currentUser", JSON.stringify(user));
            onSignup(user);
        } catch (err: any) {
            alert("Signup failed: " + err.message);
        }
    };

    return (
        <div style={styles.modal}>
            <label style={styles.label}>When does your day start?</label>
            <input
                type="time"
                style={styles.smallInput}
                value={userDayStart}
                onChange={(e) => setUserDayStart(snapTo15(e.target.value, 0, 24))}
            />

            <label style={styles.label}>When does your day end?</label>
            <input
                type="time"
                style={styles.smallInput}
                value={userDayEnd}
                onChange={(e) => setUserDayEnd(snapTo15(e.target.value, 0, 24))}
            />

            <button style={styles.button} onClick={handleCreateSchedule}>
                Create Schedule
            </button>

            <span style={styles.back} onClick={onBack}>
        Back
      </span>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    modal: {
        backgroundColor: "#fdfdfd",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems:"center",
    },
    label: {
        fontSize: "18px",
    },
back:{
        cursor:"pointer",
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
    button: {
        width: "100%",
        marginTop: "10px",
        padding: "15px",
        border: "none",
        borderRadius: "20px",
        fontSize: "18px",
        cursor: "pointer",
        background: "linear-gradient(to right, #fdf5ac, #fdaaf6)",
    },
};

export default ChooseScheduleHoursModal