import React, {useState, useEffect} from 'react';
import Home from './page/Home';
import Signup from './page/Signup/Signup';
import Login from './page/Login/Login';
import Landing from './page/Landing/Landing';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
 
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
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;