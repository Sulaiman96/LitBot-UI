import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

const AuthPanel = () => {
    const [view, setView] = useState<'login' | 'register' | 'forgot'>("login");

    return (
        <div className="auth-panel-component m-auto shadow-md w-3xl rounded-lg bg-bone-light pt-14 pb-8 my-12">
            {view === "login" && <Login onSwitch={setView} />}
            {view === "register" && <Register onSwitch={setView} />}
            {view === "forgot" && <ForgotPassword onSwitch={setView} />}
        </div>
    );
}

export default AuthPanel;