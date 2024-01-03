import React from 'react';
import categories from '../../constants/categories';
import Button from '@mui/material/Button';

import "./StepTwo.css"

const StepTwo = () => {
  const [selectCategory, setSelectCategory] = React.useState('')

  const handleClick = (category: string) => {
    setSelectCategory(category)
  }

  return (
    <div id="onboarding-step-two">
      {categories.map((category) => {
        return (
          <Button 
            variant={category === selectCategory ? "contained": "outlined"} 
            id="onboarding-step-two-button" 
            onClick={() => handleClick(category)}
            style={{color: category === selectCategory ? "white" : "#4E4E4E", backgroundColor: category === selectCategory ? "#254139": "white"}}
          >
            {category}
          </Button>
        )
      })}
    </div>
  )
}

export default StepTwo