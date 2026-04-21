import React from "react";

const AuthPage: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1>Driving productivity by staying organized</h1>

            <div style={styles.form}>
                <input placeholder="Email" />
                <input type="password" placeholder="Password" />

                <button>LOG IN</button>

                <p>Need an account? SIGN UP</p>
            </div>
        </div>
    );
};

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        textAlign: "center",
        marginTop: "100px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "250px",
        margin: "auto",
    },
};

export default AuthPage;