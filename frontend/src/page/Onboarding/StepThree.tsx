import React from 'react';
import "./StepThree.css"
import categories from '../../constants/categories';

import { useGiveBuddyStore } from '../../store/store';

const StepThree = (props: any) => {
  const [subcategory_list, updateSubcategory] = useGiveBuddyStore(
    (state) => [state.subcategory_list, state.updateSubcategory]
  )

  const category = categories.filter((category) => 
    category.name === props.category
  )[0]

  const onClickCard = (subcategory: string) => {
    if(!subcategory_list.includes(subcategory)){
      const newSubcategoryList = [...subcategory_list, subcategory]
      updateSubcategory(newSubcategoryList)
    } 
    else {
      const newSubcategoryList = subcategory_list.filter((s) => s !== subcategory)
      updateSubcategory(newSubcategoryList)
    }

  }

  React.useEffect(() => {
    console.log(subcategory_list)
  }, [subcategory_list])

  return (
    <div id="onboarding-step-three">
      {category.subcategories.map((c) => {
        return (
          <div 
            id="onboarding-step-three-card-container" 
            style={{backgroundColor: subcategory_list.includes(c.name) ? "#254139": "white"}}
            onClick={() => onClickCard(c.name)}
          >
            <h1 
              style={{color: subcategory_list.includes(c.name) ? "white" : "#4E4E4E"}}
              id={c.description !== "" ? "onboarding-step-three-card-name" : "onboarding-step-three-card-name-no-description"}
            >
              {c.name}
            </h1>
            {c.description !== "" && (<p style={{color: subcategory_list.includes(c.name) ? "white" : "#4E4E4E"}} id="onboarding-step-three-card-description">{c.description}</p>)}
          </div>
        )
      })}
    </div>
  )
}

export default StepThree