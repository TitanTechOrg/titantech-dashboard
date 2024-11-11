// src/components/RouteGuard.tsx
import { usePreferencesStore } from '@/stores/preferences.store';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export default function RouteGuard({ children }: React.PropsWithChildren<{}>) {
    const { clan_token } = useParams<{ clan_token: string }>();
    const navigate = useNavigate();
    const { login, checkAuth, logout } = usePreferencesStore();
    const [isLoading, setIsLoading] = useState(true); // To delay rendering until the auth check is done

    useEffect(() => {
        const isValidToken = clan_token && clan_token.length === 36;
        const isLoggedIn = checkAuth();

        if (isValidToken && !isLoggedIn) {
            // Try to log in with the clan token
            if (login(clan_token)) {
                navigate('/dashboard', { replace: true });
            } else {
                logout(); // Clear any invalid tokens
                navigate('/', { replace: true });
            }
        } else if (!isLoggedIn) {
            // If not authenticated, redirect to home
            navigate('/', { replace: true });
        } else {
            // Set loading state to false only after determining auth status
            setIsLoading(false);
        }
    }, [clan_token, login, checkAuth, logout, navigate]);

    // Delay rendering children or Outlet until authentication check completes
    if (isLoading) return null;

    return <>{children || <Outlet />}</>;
}
