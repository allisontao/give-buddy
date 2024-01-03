import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import "./Onboarding.css"
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

const Onboarding = () => {
  const navigate = useNavigate();
  const [curStep, setCurStep] = React.useState(1);

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

  const step = () => {
    switch(curStep) {
      case 1:   return <StepOne />;
      case 2:   return <StepTwo />;
      case 3: return <StepThree />;
      case 4:  return <StepFour />;
      default:      return <h1>No project match</h1>
    }
  }

  return (
    <>
      <div id="onboarding-page">
        <div id="onboarding-page-left">
          <p id="onboarding-page-left-title">Rank these <span style={{textDecorationLine: "underline"}}>charity characteristics</span> based on how much you value them.</p>
          <p id="onboarding-page-left-description">1: most important and 3: least important </p>

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