import React, { useEffect } from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./Home.css"

const Home = () => {
    const navigate = useNavigate();
    const auth = getAuth();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user)
      } else {
        // User is signed out
        navigate("/login");
        console.log("no user")
      }
    });

    return(
      <>
        <div id="home-page">
          <p id="home-page-title">Let’s get to know you better.</p>
          <p id="home-page-description">To find charities that resonate with your values and passions, we’ll ask you a few questions. Your answers will help us create a personalized selection of causes that you align with.</p>
          <p id="home-page-description">Please note that skipping questions may affect the precision of your results.</p>

          <a href="/onboarding" id="home-page-link"><p style={{paddingTop: "40px"}}>Get Started</p></a>
          {/* <div>
            <button onClick={handleLogout}>
              Logout
            </button>
          </div> */}
        </div>
      </>
    )
}
 
export default Home;