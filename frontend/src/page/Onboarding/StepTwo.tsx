import React from 'react';
import categories from '../../constants/categories';
import Button from '@mui/material/Button';
import { useGiveBuddyStore } from '../../store/store';

import "./StepTwo.css"

const StepTwo = () => {
  const [category, updateCategory] = useGiveBuddyStore(
    (state) => [state.category, state.updateCategory]
  )

  const [selectCategory, setSelectCategory] = React.useState<string[]>([])

  const handleClick = (category: string) => {
    if (!selectCategory.includes(category)){
      const newSelectedCategory = [...selectCategory, category]
      setSelectCategory(newSelectedCategory)
      updateCategory(newSelectedCategory)
    }
    else {
      const newSelectedCategory = selectCategory.filter((c) => c !== category)
      setSelectCategory(newSelectedCategory)
      updateCategory(newSelectedCategory)
    }
  }

  // React.useEffect(() => {
  //   console.log(category)
  // }, [category])

  return (
    <div id="onboarding-step-two">
      {categories.map((category) => {
        return (
          <Button 
            variant={selectCategory.includes(category) ? "contained": "outlined"} 
            id="onboarding-step-two-button" 
            onClick={() => handleClick(category)}
            style={{color: selectCategory.includes(category) ? "white" : "#4E4E4E", backgroundColor: selectCategory.includes(category) ? "#254139": "white"}}
          >
            {category}
          </Button>
        )
      })}
    </div>
  )
}

export default StepTwo