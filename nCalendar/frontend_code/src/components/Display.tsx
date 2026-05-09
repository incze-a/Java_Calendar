import React, { useEffect, useState } from "react";

interface Props {
    username: string;
}

const Display: React.FC<Props> = ({username}) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const currentDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const currentTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return (

        <div style={styles.container}>
            <div style={styles.logo}>{username}'s schedule</div>
<div style={styles.smaller_container}>
            <div style={styles.date}>{currentDate}</div>
            <div style={styles.time}>{currentTime}</div>
</div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container:{
        height:"250px",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",},
    smaller_container: {
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
    },
    logo: {
        fontWeight:"bold",
        fontSize:"20px"
    },
    date: {
        fontSize: "20px",
        fontWeight: "normal",
        color: "#666",
    },
    time: {
        fontSize: "20px",
        color: "#666",
    },
};

export default Display;