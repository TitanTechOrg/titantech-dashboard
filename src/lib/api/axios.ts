import { usePreferencesStore } from '@/stores/preferences.store';
import Axios, { InternalAxiosRequestConfig } from 'axios';

export const ENDPOINTS = {
    timeline_chart: 'api/v1/metrics/attack_occurrence',
    titans: 'api/v1/raid/titans',
    raid_attack_log: {
        v1: 'api/v1/raid/attacks',
        v2: 'api/v2/raid/attacks',
        v3: 'api/v3/raid/attacks',
    },
    alchemy_crafts: 'api/v5/alchemy',
    raid_list: '/api/v1/raid/list',
    cycle_data: '/api/v1/raid/cycles',
    overview: '/api/v1/overview/players',
} as const;

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.Accept = 'application/json';

    if (config.params && 'noAuth' in config.params) {
        delete config.params['noAuth'];
        return config;
    }

    const token = usePreferencesStore.getState().token;

    if (token) {
        config.headers.authorization = `${token}`;
    }

    return config;
};

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);
