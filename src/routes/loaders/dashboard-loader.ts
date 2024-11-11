import { usePreferencesStore } from '@/stores/preferences.store';
import { redirect } from 'react-router-dom';

export const dashboardLoader = async () => {
    const { checkAuth } = usePreferencesStore.getState();

    if (checkAuth()) {
        return null;
    } else {
        return redirect('/');
    }
};
