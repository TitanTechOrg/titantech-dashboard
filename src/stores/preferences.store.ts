import { StateCreator, create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserPreferencesState = {
    token: string | undefined;
    setToken: (token: string) => void;

    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;

    offstratDamageThreshold: number;
    setOffstratDamageThreshold: (offstratDamageThreshold: number) => void;
};

const UserPreferenceSlice: StateCreator<UserPreferencesState, [['zustand/persist', unknown]]> = (set) => ({
    token: undefined,
    setToken: (token: string) => set(() => ({ token })),

    darkMode: false,
    setDarkMode: (darkMode: boolean) => set(() => ({ darkMode })),

    offstratDamageThreshold: 1_000_000,
    setOffstratDamageThreshold: (offstratDamageThreshold: number) => set(() => ({ offstratDamageThreshold })),
});

export const usePreferencesStore = create<UserPreferencesState>()(
    persist(UserPreferenceSlice, {
        name: 'titan_tech_preferences', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    })
);
