import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

interface GiveBuddyState {
  category: string[]
}

type GiveBuddyAction = {
  updateCategory: (nav: GiveBuddyState['category']) => void
}

export const useGiveBuddyStore = createWithEqualityFn<GiveBuddyState & GiveBuddyAction>()((set) => ({
  category: [],
  updateCategory: (newCategory) => set(() => ({ category: newCategory })),
}), shallow)