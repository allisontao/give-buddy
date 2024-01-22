import React, {useState, useEffect} from 'react';
import Home from './page/Home/Home';
import Signup from './page/Signup/Signup';
import Login from './page/Login/Login';
import Landing from './page/Landing/Landing';
import Onboarding from './page/Onboarding/Onboarding';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Loading from './page/Loading/Loading';
import RecommendedCharities from './page/RecommendedCharities/RecommendedCharities';
 
function App() {
  return (
    <Router>
      <div>
        <section>                              
            <Routes>                                                                        
              <Route path="/" element={<Landing/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/onboarding" element={<Onboarding/>}/>
              <Route path="/loading" element={<Loading/>}/>
              <Route path="/recommended_charities" element={<RecommendedCharities/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;