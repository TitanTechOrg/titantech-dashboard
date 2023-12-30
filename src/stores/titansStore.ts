import { TitanSequence } from '@/pages/dashboard/raid-log/types';
import { create } from 'zustand';

type TitanStoreState = {
    titans: TitanSequence[];
    currentTitan: TitanSequence | null;
    setTitans: (titans: TitanSequence[]) => void;
    setCurrentTitan: (titan: TitanSequence) => void;
};

const useTitanStore = create<TitanStoreState>()((set) => ({
    titans: [],
    currentTitan: null,
    setTitans: (titans: TitanSequence[]) => set(() => ({ titans })),
    setCurrentTitan: (currentTitan: TitanSequence) => set(() => ({ currentTitan })),
}));

export default useTitanStore;
