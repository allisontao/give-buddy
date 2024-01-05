import React from 'react';
import "./StepFour.css"

const StepFour = () => {
  const choices = ["Within Canada", "Within my province", "Within my city", "Doesn’t matter to me"]
  const [showProvince, setShowProvince] = React.useState(false)
  const [location, setLocation] = React.useState("")

  const handleClick = (choice: string) => {
    if (choice === "Within my province") {
      setShowProvince(true)
    }
    setLocation(choice)
  }

  return (
    <div id="onboarding-step-four">
      {choices.map((choice) => {
        return (
          <>
            <div id="onboarding-step-four-button" onClick={() => handleClick(choice)}>
              <p id="onboarding-step-four-button-text">{choice}</p>
            </div>
            {(choice === "Within my province" && showProvince === true) && (
              <>
                <p id="onboarding-step-four-subtext">Enter Province</p>
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