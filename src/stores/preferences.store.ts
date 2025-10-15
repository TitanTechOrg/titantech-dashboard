import { StateCreator, create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserPreferencesState = {
  token: string | undefined;
  setToken: (token: string) => void;

  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;

  offstratDamageThreshold: number;
  setOffstratDamageThreshold: (offstratDamageThreshold: number) => void;

  checkAuth: () => boolean;
  login: (token: string) => boolean;
  logout: () => void;
};

const UserPreferenceSlice: StateCreator<
  UserPreferencesState,
  [['zustand/persist', unknown]]
> = (set, get) => ({
  token: undefined,
  setToken: (token: string) => set(() => ({ token })),

  darkMode: false,
  setDarkMode: (darkMode: boolean) => set(() => ({ darkMode })),

  offstratDamageThreshold: 1_000_000,
  setOffstratDamageThreshold: (offstratDamageThreshold: number) =>
    set(() => ({ offstratDamageThreshold })),

  login: (token: string) => {
    set(() => ({ token }));
    return true;
  },
  checkAuth: () => {
    return !!get().token;
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
