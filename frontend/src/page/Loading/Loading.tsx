import React from 'react';
import "./Loading.css"
import LoadingIcon from "../../assets/Loading.png"


const Loading = () => {
  return (
    <div id="loading-page">
      <h1>Please wait while we generate charities that match your preferences</h1>
      <img src={LoadingIcon}/>
    </div>
  )
}

export default Loading