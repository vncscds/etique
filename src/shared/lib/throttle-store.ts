import { create } from 'zustand';

type TUseThrottleStore = {
  throttleMs: number;
  isThrottled: boolean;
  setIsThrottled: (value: boolean) => void;
}

const useThrottleStore = create<TUseThrottleStore>((set, get) => ({
  throttleMs: 3000,
  isThrottled: false,
  setIsThrottled: (value: boolean) => set(() => ({ isThrottled: value }))
}));

export default useThrottleStore;