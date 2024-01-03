import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Landing.css';
import logo from "../../assets/logo.jpeg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div id="landing-page">
      <div id="nav-header">
        <a href="/"><p id="title">GiveBuddy</p></a>
        <div id="right-nav-header">
          <a href="/login" id="nav-link">About Us</a>
          <a href="/login" id="nav-link">All Charities</a>
          <button onClick={() => navigate("/signup")} id="nav-button">Sign up</button>
          <button onClick={() => navigate("/login")} id="nav-button">Log in</button>
        </div>
      </div>
      
      <div id="main-content">
        <div id="main-content-text">
          <h1 id="main-text">Finding the right charity for you.</h1>
          <p id="description">Discover and support charities that aligns with your values.</p>
          <div id="right-nav-header">
            <button onClick={() => navigate("/signup")} id="main-content-button">Sign up</button>
            <button onClick={() => navigate("/login")} id="main-content-button">Log in</button>
          </div>
        </div>
        <img src={logo} id="logo"/>
      </div>
    </div>
  )
}

export default Landing;