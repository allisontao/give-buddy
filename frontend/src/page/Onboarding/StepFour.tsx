import React from 'react';
import "./StepFour.css";
import { useGiveBuddyStore } from '../../store/store';

const StepFour = () => {
  const choices = ["Within Canada", "Within my province", "Within my city", "Doesn’t matter to me"]
  const [showProvince, setShowProvince] = React.useState(false)
  const [showCity, setShowCity] = React.useState(false)
  // const [location, setLocation] = React.useState("")

  const [location, updateLocation] = useGiveBuddyStore(
    (state) => [state.location, state.updateLocation]
  )

  const handleClick = (choice: string) => {
    if (choice === "Within my province") {
      setShowCity(false)
      setShowProvince(true)
    } 
    else if (choice === "Within my city") {
      setShowProvince(false)
      setShowCity(true)
    }
    else {
      setShowCity(false)
      setShowProvince(false)
    }
    updateLocation(choice)
  }

  const onInputChange = (e: any) => {
    updateLocation(e.target.value)
  }

  React.useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <div id="onboarding-step-four">
      {choices.map((choice) => {
        return (
          <>
            <div 
              id="onboarding-step-four-button" 
              onClick={() => handleClick(choice)}
              style={{backgroundColor: location === choice ? "#F2F2F2": "white", border: location === choice ? "3px solid #BEBEBE" : "1px solid #BEBEBE"}}
            >
              <p id="onboarding-step-four-button-text">{choice}</p>
            </div>
            {(choice === "Within my province" && showProvince === true) && (
              <>
                <p id="onboarding-step-four-subtext">Enter Province</p>
                <input id="onboarding-step-four-input" onInput={onInputChange}/>
              </>
            )}
            {(choice === "Within my city" && showCity === true) && (
              <>
                <p id="onboarding-step-four-subtext">Enter City</p>
                <input id="onboarding-step-four-input"/>
              </>
            )}
          </>
        )
      })}
    </div>
  )
}

export default StepFour