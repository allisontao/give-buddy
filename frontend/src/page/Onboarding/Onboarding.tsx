import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import "./Onboarding.css"
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

import { useGiveBuddyStore } from '../../store/store';

const Onboarding = () => {
  const navigate = useNavigate();
  const [curStep, setCurStep] = React.useState(1);

  const [category] = useGiveBuddyStore(
    (state) => [state.category]
  )

  const handleNextClick = () => {
    const newStep = curStep + 1
    setCurStep(newStep)
  }

  const handleBackClick = () => {
    const newStep = curStep - 1
    if (newStep === 0){
      navigate("/home")
    } 
    else {
      setCurStep(newStep)
    }
  }

  React.useEffect(() => {
    console.log(category)
  }, [category])

  const step = () => {
    switch(curStep) {
      case 1:   return <StepOne />;
      case 2:   return <StepTwo />;
      case 3:   return <StepThree category={category[0]}/>;
      case 4:  return <StepFour />;
      default:      return <h1>No project match</h1>
    }
  }

  const title = (subcategory?: string) => {
    switch(curStep) {
      case 1:   return <p id="onboarding-page-left-title">Rank these <span style={{textDecorationLine: "underline"}}>charity characteristics</span> based on how much you value them.</p>;
      case 2:   return <p id="onboarding-page-left-title">What causes are you interested in?</p>;
      case 3:   return <p id="onboarding-page-left-title">Which <span style={{textDecorationLine: "underline", textTransform: "lowercase"}}>{subcategory}</span> causes are particularly meaningful to you?</p>;
      case 4:   return <p id="onboarding-page-left-title">Where would you like to donate?</p>;
      default:  return null
    }
  }

  const description = () => {
    switch(curStep) {
      case 1:   return <p id="onboarding-page-left-description">1: most important and 3: least important</p>;
      case 2:   return <p id="onboarding-page-left-description">You can select multiple causes that you resonate with.</p>;
      case 3:   return <p id="onboarding-page-left-description">You can select more than one.</p>;
      case 4:   return <p id="onboarding-page-left-description">We will adjust your results based on your location preferences.</p>;
      default:  return null
    }
  }

  return (
    <>
      <div id="onboarding-page">
        <div id="onboarding-page-left">
          {title(category[0])}
          {description()}

          <div id="onboarding-page-left-link-container">
            <div id="onboarding-page-left-link-group">
              <a onClick={handleBackClick}><p id="onboarding-page-left-link">Back</p></a>
              <a onClick={handleNextClick}><p id="onboarding-page-left-link">Skip question</p></a>
            </div>
          </div>
        </div>

        <div id="onboarding-page-right">
          {step()}
        </div>
      </div>

      <a onClick={handleNextClick}><p id="onboarding-page-next-link">Next</p></a>
    </>
  )
}

export default Onboarding