import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import AuthPanel from "@/components/Authentication/AuthPanel";

type AuthView = 'login' | 'register' | 'forgot';

const LoginOrRegister = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState<AuthView>('login');

    useEffect(() => {
        const actionParam = searchParams.get('action');

        if (actionParam === 'reset-password') {
            // If action is 'reset-password', show the ForgotPassword component.
            // ForgotPassword.tsx will internally handle the 'reset' view mode.
            if (activeView !== 'forgot') {
                setActiveView('forgot');
            }
            // Importantly, do not change the URL here; 'action=reset-password' is needed by ForgotPassword.tsx.
        } else if (actionParam === 'login' || actionParam === 'register' || actionParam === 'forgot') {
            // If action is one of the valid top-level views
            const validAction = actionParam as AuthView;
            if (activeView !== validAction) {
                setActiveView(validAction);
            }
        } else {
            // Action is null, undefined, or an unrecognized value. Default to 'login'.
            if (activeView !== 'login') {
                setActiveView('login');
            }
            // And ensure the URL reflects this default, only navigate if it's not already correct.
            if (actionParam !== 'login') {
                navigate({ search: '?action=login' }, { replace: true });
            }
        }
    }, [searchParams, activeView, navigate]);

    const handleSwitchView = (newView: AuthView) => {
        setActiveView(newView);
        // Update URL without adding to history stack if it's the same as current activeView derived from URL
        // Or simply navigate, which setSearchParams also does effectively
        setSearchParams({ action: newView }); 
    };

    return (
        <div className="w-full overflow-x-hidden bg-outer-space">
            <AuthPanel currentView={activeView} onSwitchView={handleSwitchView} />
        </div>
    );
}

export default LoginOrRegister;