import React, { useEffect } from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
        <nav>
          <p>
            Welcome Home, Give Buddy
          </p>

          <div>
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      </>
    )
}
 
export default Home;