import { TitanSequence } from '@/pages/dashboard/raid-log/types';
import { create } from 'zustand';

type TitanStoreState = {
    titans: TitanSequence[];
    setTitans: (titans: TitanSequence[]) => void;
};

const useTitanStore = create<TitanStoreState>()((set) => ({
    titans: [],
    setTitans: (titans: TitanSequence[]) => set(() => ({ titans })),
}));

export default useTitanStore;
