import React, {useRef, useState} from "react";
import AccountMenu from "./AccountMenu";
import { UserResponse } from "../services/api";

interface Props {
    currentUser: UserResponse;
    onUserUpdated: (user: UserResponse) => void;
    onLogout: () => void;
}

const Navbar: React.FC<Props> = ({
                                     currentUser,
                                     onUserUpdated,
                                     onLogout,
                                 }) => {
    const [accountOpen, setAccountOpen] = useState(false);
    const accountButtonRef = useRef<HTMLSpanElement | null>(null);

    return (
        <div style={styles.navbar}>
                <span>nCalendar</span>
            <div style={styles.menu}>
          <span
              ref={accountButtonRef}
              onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setAccountOpen((prev)=>!prev);
              }}
          >
            Account
          </span>
                {accountOpen && (
                    <AccountMenu
                        user={currentUser}
                        onUserUpdated={onUserUpdated}
                        onLogout={onLogout}
                        onClose={() => setAccountOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        background: "linear-gradient(to right, #fdf5ac, #fdaaf6)",
    },
    menu: {
        display: "flex",
        gap: "20px",
        cursor: "pointer",
    },
};

export default Navbar;