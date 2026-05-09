import React, {useState} from "react";
import SignUpModal, {SignupDraft} from "../components/SignUpModal";
import Topbar from "../components/Topbar";
import LoginModal from "../components/LoginModal";
import ChooseScheduleHoursModal from "../components/ChooseScheduleHoursModal";
import {UserResponse} from "../services/api";

interface Props {
    onAuthenticated: (user: UserResponse) => void;
}
type AuthStep = "login" | "signup" | "hours";


const AuthPage: React.FC<Props> = ({ onAuthenticated }) => {
    const [step, setStep] = useState<AuthStep>("login");
    const [signupDraft, setSignupDraft] = useState<SignupDraft | null>(null);

    return (
        <><Topbar/>
            <div style={styles.container}>
                <div style={styles.left_container}>
                    <h1>Driving productivity by staying organized</h1>
                </div>
                <div>
                    {step === "login" && (
                        <LoginModal
                            onLogin={onAuthenticated}
                            onSwitchToSignup={() => setStep("signup")}/>
                    )}

                    {step === "signup" && (
                        <SignUpModal
                            onContinue={(data) => {
                                setSignupDraft(data);
                                setStep("hours");
                            }}
                            onSwitchToLogin={() => setStep("login")}/>
                    )}

                    {step === "hours" && signupDraft && (
                        <ChooseScheduleHoursModal
                            signupData={signupDraft}
                            onSignup={onAuthenticated}
                            onBack={() => setStep("signup")}/>
                    )}
                </div>
            </div>
        </>
    );
};

const styles: {[key: string]: React.CSSProperties} = {
container:{
    display: "flex",
    paddingLeft: "100px",
    paddingRight:"200px",
    gap: "50px",
    alignItems:"center",
    height:"85vh",
    justifyContent:"space-between",
},
left_container:{
    fontFamily:"serif",
    },
};

export default AuthPage;