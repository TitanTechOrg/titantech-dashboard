import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const ENDPOINTS = {
    timeline_chart: 'api/v1/metrics/attack_occurrence',
    titans: 'api/v1/raid/titans',
    raid_attack_log: {
        v1: 'api/v1/raid/attacks',
        v2: 'api/v2/raid/attacks',
    },
    alchemy_crafts: 'api/v3/alchemy',
    raid_list: '/api/v1/raid/list',
    cycle_data: '/api/v1/raid/cycles',
} as const;

const instance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
});

// instance.interceptors.request.use(
//     async (config: InternalAxiosRequestConfig<AxiosHeaderValue | undefined>) => {
//         const clan_token = localStorage.getItem('clan_token');
//         if (clan_token) {
//             config.headers = {
//                 ...config.headers,
//                 Authorization: clan_token,
//             };
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

const setAuthorizationHeader = (token: string): AxiosRequestConfig => {
    return {
        headers: { Authorization: token },
    };
};

const getRequest = async <T>(url: string, withToken: boolean = true): Promise<T> => {
    const token = localStorage.getItem('clan_token');
    let options = undefined;
    if (withToken && token) options = setAuthorizationHeader(token);
    const request = instance.get(url, options);
    const { data }: AxiosResponse<T> = await request;

    return data;
};

export { ENDPOINTS, instance, getRequest };
