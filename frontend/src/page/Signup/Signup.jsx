import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase';
import "./Signup.css"
 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
    <>
      <div id="header">
        <a href="/"><p id="title">GiveBuddy</p></a>
      </div>

      <div id="signup-page">    
        <div id="signup-container">
          <p id="signup-main-text">Create an Account</p>       
          <p id="signup-description">Discover your favourite charities with us!</p>                                                                    
          <form id="signup-form">   
              <div id="signup-form-name-field">
                <div id="signup-form-item">
                  <label htmlFor="first-name">
                      First Name
                  </label>
                  <input
                      id="signup-form-input"
                      name="first-name"
                      type="text"                                    
                      required                    
                      onChange={(e)=>setFirstName(e.target.value)}
                      style={{marginRight: '20px'}}
                  />
                </div>
                
                <div id="signup-form-item">
                  <label htmlFor="last-name">
                      Last Name
                  </label>
                  <input
                      id="signup-form-input"
                      name="last-name"
                      type="text"                                    
                      required                 
                      onChange={(e)=>setLastName(e.target.value)}
                  />
                </div>
              </div>                                                                                          
              <div id="signup-form-item">
                  <label htmlFor="email-address">
                      Email address
                  </label>
                  <input
                      id="signup-form-input"
                      type="email"
                      label="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}  
                      required                                                    
                  />
              </div>

              <div id="signup-form-item">
                  <label htmlFor="password">
                      Password
                  </label>
                  <input
                      id="signup-form-input"
                      type="password"
                      label="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      required                              
                  />
              </div>                                             
              
              <button
                  type="submit" 
                  onClick={onSubmit} 
                  id="signup-form-button"                       
              >  
                  Create an Account                              
              </button>                                   
          </form>
          
          <p>
              Already have an account?{' '}
              <NavLink to="/login" style={{textDecoration:"underline", color: 'black'}}>
                  Log in
              </NavLink>
          </p>        
        </div>           
      </div>
    </>
  )
}
 
export default Signup