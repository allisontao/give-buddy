import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Onboarding.css"
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

import { useGiveBuddyStore } from '../../store/store';
import { API_URL } from "../../constants/url";

const Onboarding = () => {
  const navigate = useNavigate();
  const [curStep, setCurStep] = React.useState(1);
  const [curSubcategroy, setCurSubcategory] = React.useState(0)

  const [ft_ranking, rr_ranking, ctc_ranking, category, subcategory_list, province, city, updateMatchedCharities] = useGiveBuddyStore(
    (state) => [state.transparency_score, state.result_reporting_score, state.cause_score, state.category, state.subcategory_list, state.province, state.city, state.updateMatchedCharities]
  )

  const postOnboarding = () => {
    navigate("/loading")
    axios
      .post(`${API_URL}/onboarding/1`, {
        "ft_ranking":ft_ranking,
        "rr_ranking":rr_ranking,
        "ctc_ranking":ctc_ranking,
        "categories":category,
        "subcategories":subcategory_list, 
        "province": province, 
        "city": city
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res.data.user_matched_charities)
        updateMatchedCharities(res.data.user_matched_charities)
        navigate("/recommended_charities")
      })
      .catch((err) => console.log(err));
  }

  const handleNextClick = () => {
    if (curStep === 3 && curSubcategroy < category.length - 1){
      const newSubcategory = curSubcategroy + 1
      setCurSubcategory(newSubcategory)
    }
    else if (curStep === 2 && curSubcategroy === 0){
      if(category.length === 0){
        const newStep = curStep + 2
        setCurStep(newStep)
      }
      else {
        const newStep = curStep + 1
        setCurStep(newStep)
        setCurSubcategory(0)
      }
    }
    else if(curStep === 4){
      postOnboarding()
    }
    else {
      const newStep = curStep + 1
      setCurStep(newStep)
    }
  }

  const handleBackClick = () => {
    if (curStep === 1){
      const newStep = curStep - 1
      setCurStep(newStep)
      navigate("/home")
    } 
    else if(curStep === 3 && curSubcategroy > 0){
      const newSubcategory = curSubcategroy - 1
      setCurSubcategory(newSubcategory)
      return
    }
    else if(curStep === 4){
      if(category.length === 0){
        const newStep = curStep - 2
        setCurStep(newStep)
      }
      else {
        const newStep = curStep - 1
        setCurStep(newStep)
        setCurSubcategory(category.length - 1)
      }
    }
    else {
      const newStep = curStep - 1
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
      case 3:   return <StepThree category={category[curSubcategroy]}/>;
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
          {title(category[curSubcategroy])}
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