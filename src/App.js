import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Main from './Pages/Main';
import Auth from "./Context/Auth";
import Home from './Pages/Home';
import StaffLogin from './Pages/StaffLogin';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import LogQRAuthentication from './Pages/LogQRAuthentication';
import ChangePassword from './Pages/ChangePassword';

class App extends Component {
  render() {
    return (
      <Auth.Provider>
        <HashRouter>
          <div className="App">
            <Main>
              <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/StaffLogin" element={<StaffLogin/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/UserInfo" element={<Home userInfoOpen={true}/>}/>
                <Route path="/Admin" element={<Admin/>}/>
                <Route path="/LogQRAuthentication/:authenticationId/" element={<LogQRAuthentication/>}/>
                <Route path="/changePassword/:passwordResetId" element={<ChangePassword/>}/>
              </Routes>
            </Main>
          </div>
        </HashRouter>
      </Auth.Provider>
    );
  }
}

export default App;
