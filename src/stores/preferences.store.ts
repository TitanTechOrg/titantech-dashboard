import { StateCreator, create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const VALID_TOKEN_LENGTH: number = 36;

type UserPreferencesState = {
    token: string | undefined;
    setToken: (token: string) => void;

    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;

    offstratDamageThreshold: number;
    setOffstratDamageThreshold: (offstratDamageThreshold: number) => void;

    checkAuth: () => boolean;
    login: (token: string) => boolean; // Modify return type to indicate success/failure
    logout: () => void;
};

const UserPreferenceSlice: StateCreator<UserPreferencesState, [['zustand/persist', unknown]]> = (set, get) => ({
    token: undefined,
    setToken: (token: string) => set(() => ({ token })),

    darkMode: false,
    setDarkMode: (darkMode: boolean) => set(() => ({ darkMode })),

    offstratDamageThreshold: 1_000_000,
    setOffstratDamageThreshold: (offstratDamageThreshold: number) => set(() => ({ offstratDamageThreshold })),

    checkAuth: () => {
        const token = get().token;
        return !!token && token.length === VALID_TOKEN_LENGTH; // Check if the token exists and is 36 characters long
    },
    login: (token: string) => {
        if (token.length === VALID_TOKEN_LENGTH) {
            // Ensure token is exactly 36 characters
            set(() => ({ token }));
            return true; // Indicate successful login
        }
        return false; // Indicate failed login due to invalid token length
    },
    logout: () => {
        set(() => ({ token: undefined }));
    },
});

export const usePreferencesStore = create<UserPreferencesState>()(
    persist(UserPreferenceSlice, {
        name: 'titan_tech_preferences',
        storage: createJSONStorage(() => localStorage),
    })
);
