import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const ENDPOINTS = {
    timeline_chart: 'api/v1/metrics/attack_occurrence',
    raid_attack_log: 'api/v1/raid/attacks',
    alchemy_crafts: 'api/v3/alchemy',
} as const;

const instance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
});

const setAuthorizationHeader = (token: string): AxiosRequestConfig => {
    return {
        headers: { Authorization: token },
    };
};

const getRequest = async <T>(url: string, token?: string): Promise<T> => {
    const options = token ? setAuthorizationHeader(token) : undefined;
    const response: AxiosResponse<T> = await instance.get(url, options);
    return await response.data;
};

// const a = `curl 'https://titan-tech-dashboard-2q0n24y4.ew.gateway.dev/api/v1/metrics/attack_occurrence?raid_id=c441cf35-3e1c-4c65-8519-67597a58ddef' -H 'Authorization: b9f0f10d-da1f-45ab-b408-db14055422d9'`;

// export const b = async ({ pageParam = 0 }, token: string) => {
//     try {
//         const res = await instance.get(ENDPOINTS.raid_attack_log + '?offset=' + pageParam, {
//             headers: { Authorization: token },
//         });
//         amountDataLoaded = amountDataLoaded + res.data.attack_logs.length;
//         return res.data;
//     } catch (err) {
//         handleError();
//     }
// };

export { ENDPOINTS, instance, getRequest };
