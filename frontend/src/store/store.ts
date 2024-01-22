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
  user_uid: string | undefined
  user_id: string | undefined
  matched_charities: Number[] | undefined
}

type GiveBuddyAction = {
  updateCategory: (category: GiveBuddyState['category']) => void
  updateSubcategory: (csubcategory_list: GiveBuddyState['subcategory_list']) => void
  updateTransparencyScore: (transparency_score: GiveBuddyState['transparency_score']) => void
  updateCauseScore: (cause_score: GiveBuddyState['cause_score']) => void
  updateResultReportingScore: (result_reporting_score: GiveBuddyState['result_reporting_score']) => void
  updateLocation: (location: GiveBuddyState['location']) => void
  updateProvince: (province: GiveBuddyState['province']) => void
  updateCity: (city: GiveBuddyState['city']) => void
  updateUserUid: (user_uid: GiveBuddyState['user_uid']) => void
  updateUserId: (user_id: GiveBuddyState['user_id']) => void
  updateMatchedCharities: (matched_charities: GiveBuddyState['matched_charities']) => void
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
  user_uid: "",
  user_id: "",
  matched_charities: [],
  updateCategory: (newCategory) => set(() => ({ category: newCategory })),
  updateSubcategory: (newSubcategory) => set(() => ({ subcategory_list: newSubcategory})),
  updateTransparencyScore: (newScore) => set(() => ({ transparency_score: newScore })),
  updateCauseScore: (newScore) => set(() => ({ cause_score: newScore })),
  updateResultReportingScore: (newScore) => set(() => ({ result_reporting_score: newScore })),
  updateLocation: (newLocation) => set(() => ({ location: newLocation })),
  updateProvince: (newProvince) => set(() => ({ province: newProvince })),
  updateCity: (newCity) => set(() => ({ city: newCity })),
  updateUserUid: (newUserUid) => set(() => ({ user_uid: newUserUid })),
  updateUserId: (newUserId) => set(() => ({ user_id: newUserId })),
  updateMatchedCharities: (newMatchedCharities) => set(() => ({ matched_charities: newMatchedCharities })),
}), shallow)