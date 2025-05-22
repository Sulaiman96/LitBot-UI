import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

interface AuthPanelProps {
  currentView: 'login' | 'register' | 'forgot';
  onSwitchView: (view: 'login' | 'register' | 'forgot') => void;
}

const AuthPanel: React.FC<AuthPanelProps> = ({ currentView, onSwitchView }) => {
    return (
        <div className="auth-panel-component m-auto shadow-md w-3xl rounded-lg bg-bone-light pt-14 pb-8 my-12">
            {currentView === "login" && <Login onSwitch={onSwitchView} />}
            {currentView === "register" && <Register onSwitch={onSwitchView} />}
            {currentView === "forgot" && <ForgotPassword onSwitch={onSwitchView} />}
        </div>
    );
}

export default AuthPanel;