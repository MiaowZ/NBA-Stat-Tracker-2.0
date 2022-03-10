/* eslint-disable react/jsx-filename-extension */
import React, { Component, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainContainer from './MainContainer.js';
import GoogleLoginHook from '../components/GoogleLoginHook.js';
import GoogleLogoutHook from '../components/GoogleLogoutHook.js';
import Background from '../assets/Background.mp4';

// use useContext instead grab context from Login
// const [ loggedIn ] = useState('');

document.getElementById('client_id').content = process.env.CLIENT_ID;

// class App extends Component {
function App() {
  const [favsPlayer, setFavsPlayer] = useState([]);
  const [favsTeam, setFavsTeam] = useState([]);

  return (
    <>
      {/* if not logged in, render this */}
      <video loop autoPlay muted id="myVideo">
        <source
          src={Background}
          type="video/mp4"
        />
      </video>
      <GoogleLoginHook />
      <GoogleLogoutHook />
      {/* if logged in, render dashboard */}
      <MainContainer
        favsPlayer={favsPlayer}
        favsTeam={favsTeam}
        setFavsPlayer={setFavsPlayer}
        setFavsTeam={setFavsTeam}
      />
    </>
  );
}

export default App;
