import React from "react";

const Topbar: React.FC = () => {
    return (
        <div style={styles.navbar}>
            <span>nCalendar</span>
        </div>
    );
};

const styles = {
    navbar: {
        height: "21px",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        background: "linear-gradient(to right, #fdf5ac, #fdaaf6)",
    },
};

export default Topbar;