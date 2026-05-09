import React, { useState } from "react";
import {emailExists} from "../services/api";

export interface SignupDraft {
    username: string;
    email: string;
    password: string;
}

interface Props {
    onContinue: (data: SignupDraft) => void;
    onSwitchToLogin: () => void;
}

const isValidEmail = (email: string): boolean => {
    return /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email);
};

const SignUpModal: React.FC<Props> = ({ onContinue, onSwitchToLogin }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleContinue = async () => {
        if(!isValidEmail(email.trim().toLowerCase())){
            alert("Invalid email format.");
            return;
        }

        const exists = await emailExists(email);
        if(exists){
            alert("An account with this email already exists.");
            return;
        }

        if (!username.trim() || !email.trim() || !password.trim()) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        onContinue({
            username,
            email,
            password,
        });
    };

    return (
        <div style={styles.modal}>
            <div style={styles.row}>
                <div style={styles.column}>
                    <label style={styles.label}>Username</label>
                    <input
                        style={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label style={styles.label}>Email</label>
                    <input
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label style={styles.label}>Password</label>
                    <input
                        type="password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label style={styles.label}>Confirm Password</label>
                    <input
                        type="password"
                        style={styles.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

            <button style={styles.button} onClick={handleContinue}>
                SIGN UP
            </button>

            <span style={styles.cancel} onClick={onSwitchToLogin}>
        Have an account? LOG IN
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
    column: {
        display: "flex",
        flexDirection: "column",
        gap:"10px",
        flex: 1,
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

export default SignUpModal;