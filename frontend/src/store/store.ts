import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

interface GiveBuddyState {
  category: string[]
  subcategory_list: string[]
  transparency_score: string | undefined
  cause_score: string | undefined
  result_reporting_score: string | undefined
  location: string | undefined
  province: string | undefined
  city: string | undefined
}

type GiveBuddyAction = {
  updateCategory: (category: GiveBuddyState['category']) => void
  updateSubcategory: (csubcategory_list: GiveBuddyState['subcategory_list']) => void
  updateTransparencyScore: (transparency_score: GiveBuddyState['transparency_score']) => void
  updateCauseScore: (transparency_score: GiveBuddyState['cause_score']) => void
  updateResultReportingScore: (transparency_score: GiveBuddyState['result_reporting_score']) => void
  updateLocation: (category: GiveBuddyState['location']) => void
  updateProvince: (category: GiveBuddyState['province']) => void
  updateCity: (category: GiveBuddyState['city']) => void
}

export const useGiveBuddyStore = createWithEqualityFn<GiveBuddyState & GiveBuddyAction>()((set) => ({
  category: [],
  subcategory_list: [],
  transparency_score: undefined, 
  cause_score: undefined, 
  result_reporting_score: undefined,
  location: "",
  province: "",
  city: "",
  updateCategory: (newCategory) => set(() => ({ category: newCategory })),
  updateSubcategory: (newSubcategory) => set(() => ({ subcategory_list: newSubcategory})),
  updateTransparencyScore: (newScore) => set(() => ({ transparency_score: newScore })),
  updateCauseScore: (newScore) => set(() => ({ cause_score: newScore })),
  updateResultReportingScore: (newScore) => set(() => ({ result_reporting_score: newScore })),
  updateLocation: (newLocation) => set(() => ({ location: newLocation })),
  updateProvince: (newProvince) => set(() => ({ location: newProvince })),
  updateCity: (newCity) => set(() => ({ location: newCity })),
}), shallow)