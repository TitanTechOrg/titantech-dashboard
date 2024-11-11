import { create } from 'zustand';

interface SelectStore {
    selectedValues: Record<string, string>;
    setSelectedValue: (key: string, value: string) => void;
}

export const useSelectStore = create<SelectStore>((set) => ({
    selectedValues: {},
    setSelectedValue: (key, value) =>
        set((state) => ({
            selectedValues: {
                ...state.selectedValues,
                [key]: value,
            },
        })),
}));
