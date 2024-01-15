import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

interface GiveBuddyState {
  category: string[]
  subcategory_list: string[]
}

type GiveBuddyAction = {
  updateCategory: (nav: GiveBuddyState['category']) => void
  updateSubcategory: (category: GiveBuddyState['subcategory_list']) => void
}

export const useGiveBuddyStore = createWithEqualityFn<GiveBuddyState & GiveBuddyAction>()((set) => ({
  category: [],
  subcategory_list: [],
  updateCategory: (newCategory) => set(() => ({ category: newCategory })),
  updateSubcategory: (newSubcategory) => set(() => ({ subcategory_list: newSubcategory}))
}), shallow)