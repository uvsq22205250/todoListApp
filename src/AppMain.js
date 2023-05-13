import React, {useState, useEffect} from 'react';
import Signup from './Signup';
import Login from './Login';
import App from './App';
import Dashboard from './Components/chats/dashboard';
import PasswordReset from './PasswordReset';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
 
function AppMain() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>      
               <Route path="/" element={<Login/>}/>
               <Route path="/Signup" element={<Signup/>}/>
               <Route path="/Login" element={<Login/>}/>
               <Route path="/App" element={<App/>}/>
               <Route path="/Dashboard" element={<Dashboard/>}/>
               <Route path="/PasswordReset" element={<PasswordReset/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default AppMain;