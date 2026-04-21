import React from "react";

const Display: React.FC=() => {
    return(
        <div style={styles.logo}>Username's schedule</div>
    );
};

const styles ={
    logo: {
        fontWeight:"bold",
        display:"flex",
        justifyContent:"center"
    },
}

export default Display;