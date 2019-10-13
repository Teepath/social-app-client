import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import AuthRoute from './util/authhRoute.js'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/themes'
import jwtDecode from 'jwt-decode';


//
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup';


const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken;
let authenticated;
if(token){
  const decodedToken = jwtDecode(token)
  console.log(decodedToken);
  if(decodedToken.exp *1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false
  }else{
    authenticated = true;
  }

}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
      
      <Router>
        <Navbar/>
        <div className="container">
        <Switch>
      <AuthRoute exact path="/"  component={Home}/> 
      <AuthRoute exact path="/login"  component={Login} authenticated={authenticated}/> 
      <AuthRoute exact path="/signup"  component={Signup} authenticated={authenticated}/> 
        
      </Switch>
      </div>
      </Router>

    </div>
    </MuiThemeProvider>
  );
}

export default App;
