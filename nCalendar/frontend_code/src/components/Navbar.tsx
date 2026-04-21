import React from "react";

const Navbar: React.FC = () => {
    return (
        <div style={styles.navbar}>
            <div style={styles.menu}>
                <span>Schedule</span>
                <span>Calendar</span>
            </div>
            <div style={styles.menu}>
                <span>Account</span>
            </div>
        </div>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        background: "linear-gradient(to right, #fdf5ac, #fdaaf6)",
    },
    menu: { display: "flex",
        gap: "20px",
        cursor: "pointer",
    },
};

export default Navbar;