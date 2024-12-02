import { usePreferencesStore } from '@/stores/preferences.store';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { z } from 'zod';

const uuidSchema = z.string().uuid();

const validateUUID = (uuid: string | undefined): boolean => {
    return uuidSchema.safeParse(uuid).success;
};

export default function RouteGuard({ children }: React.PropsWithChildren<{}>) {
    const { clan_token } = useParams<{ clan_token: string }>();
    const navigate = useNavigate();
    const { login, checkAuth, logout } = usePreferencesStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const isTokenRoute = !!clan_token;

        if (isTokenRoute) {
            const isValidToken = validateUUID(clan_token);

            if (!isValidToken) {
                return; // Let the router handle invalid routes
            }

            const isLoggedIn = checkAuth();
            const currentToken = usePreferencesStore.getState().token;

            if (!isLoggedIn || currentToken !== clan_token) {
                if (login(clan_token)) {
                    navigate('/dashboard', { replace: true });
                } else {
                    return; // Let the router handle fallback instead of navigating explicitly
                }
                return;
            }

            navigate('/dashboard', { replace: true });
        } else {
            if (!checkAuth()) {
                logout();
                navigate('/', { replace: true });
                return;
            }
        }

        setIsLoading(false);
    }, [clan_token, login, checkAuth, logout, navigate]);

    if (isLoading) return null;

    return <>{children || <Outlet />}</>;
}
