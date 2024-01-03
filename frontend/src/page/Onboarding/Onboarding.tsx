import React, {useState} from 'react';
import "./Onboarding.css"

const Onboarding = () => {
  return (
    <div id="onboarding-page">
      <div id="onboarding-page-left">
        <p id="onboarding-page-left-title">Rank these <span style={{textDecorationLine: "underline"}}>charity characteristics</span> based on how much you value them.</p>
        <p id="onboarding-page-left-description">1: most important and 3: least important </p>

        <div id="onboarding-page-left-link-group">
          <a href="/home"><p id="onboarding-page-left-link">Back</p></a>
          <a href="/home"><p id="onboarding-page-left-link">Skip question</p></a>
        </div>
      </div>

      <div id="onboarding-page-right">
        <p>Components</p>
      </div>
    </div>
  )
}

export default Onboarding