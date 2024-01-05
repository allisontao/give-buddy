import React from 'react';
import "./StepThree.css"
import categories from '../../constants/categories';

const StepThree = (props: any) => {
  const category = categories.filter((category) => 
    category.name === props.category
  )[0]

  return (
    <div id="onboarding-step-three">
      {category.subcategories.map((c) => {
        return (
          <div id="onboarding-step-three-card-container">
            <h1 id="onboarding-step-three-card-name">{c.name}</h1>
            <p id="onboarding-step-three-card-description">{c.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default StepThree