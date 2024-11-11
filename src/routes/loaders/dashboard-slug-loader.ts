import { usePreferencesStore } from '@/stores/preferences.store';
import { redirect } from 'react-router-dom';

type DashboardLoaderParams = {
    params: { clan_token?: string };
};

export const dashboardSlugLoader = async ({ params }: DashboardLoaderParams) => {
    const { login } = usePreferencesStore.getState();

    if (params?.clan_token && login(params.clan_token)) {
        return redirect('/dashboard');
    } else {
        return redirect('/');
    }
};
