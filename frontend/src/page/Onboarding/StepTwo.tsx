import React from 'react';
import categories from '../../constants/categories';
import Button from '@mui/material/Button';

import "./StepTwo.css"

const StepTwo = () => {
  return (
    <div id="onboarding-step-two">
      {categories.map((category) => {
        return (
          <Button variant="outlined" id="onboarding-step-two-button">{category}</Button>
        )
      })}
    </div>
  )
}

export default StepTwo