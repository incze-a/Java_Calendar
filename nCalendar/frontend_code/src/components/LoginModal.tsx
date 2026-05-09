import React, { useState } from "react";
import { loginUser, UserResponse } from "../services/api";

interface Props {
    onLogin: (user: UserResponse) => void;
    onSwitchToSignup: () => void;
}

const LoginModal: React.FC<Props> = ({ onLogin, onSwitchToSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            if (!email.trim() || !password.trim()) {
                alert("Please enter both email and password.");
                return;
            }

            const user = await loginUser(email, password);

            localStorage.setItem("currentUser", JSON.stringify(user));
            onLogin(user);
        } catch (err: any) {
            alert("Login failed: " + err.message);
        }
    };

    return (
        <div style={styles.modal}>
            <div style={styles.row}>
                <div style={styles.column}>
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
                </div>
            </div>

            <button style={styles.button} onClick={handleLogin}>
                LOG IN
            </button>

            <span style={styles.cancel} onClick={onSwitchToSignup}>
        Need an account? SIGN UP
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
    row: {
        display: "flex",
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
        gap: "10px",
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

export default LoginModal;