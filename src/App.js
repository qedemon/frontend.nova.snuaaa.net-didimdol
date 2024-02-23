import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Main from './Pages/Main';
import Auth from "./Context/Auth";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserInfo from './Pages/UserInfo';

class App extends Component {
  render() {
    return (
      <Auth.Provider>
        <BrowserRouter>
          <div className="App">
            <Main>
              <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/UserInfo" element={<UserInfo/>}/>
              </Routes>
            </Main>
          </div>
        </BrowserRouter>
      </Auth.Provider>
    );
  }
}

export default App;
