import create from 'zustand'
import { combine } from 'zustand/middleware'

export const useWallet = create((set, get) => ({
  wallet: { address: '', balance: 0 },
  change: (data) => {
    return set(() => ({ wallet: { ...get().wallet, ...data } }))
  },
}))