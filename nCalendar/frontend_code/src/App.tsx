import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import SchedulePage from "./pages/SchedulePage";
import { UserResponse } from "./services/api";

function App() {
    const [currentUser, setCurrentUser] = useState<UserResponse | null>(() => {
        const stored = localStorage.getItem("currentUser");
        return stored ? JSON.parse(stored) : null;
    });

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
    };

    if (!currentUser) {
        return <AuthPage onAuthenticated={setCurrentUser} />;
    }

    return (
        <SchedulePage
            currentUser={currentUser}
            onUserUpdated={setCurrentUser}
            onLogout={handleLogout}
        />
    );
}

export default App;