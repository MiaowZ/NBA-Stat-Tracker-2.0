/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import SearchBox from '../components/SearchBox';
import Favorites from '../components/Favorites';
import { Route, Link } from 'react-router-dom';

function Sidebar({ favsPlayer, favsTeam, setFavsPlayer, setFavsTeam }) {
  return (
    <div id="sidebar">

      <li><SearchBox setFavsPlayer={setFavsPlayer} setFavsTeam={setFavsTeam} /></li>
      <li><Link to = "/favorite-players">Favorite Players</Link></li>
      <li><Link to = "/favorite-teams">Favorite Teams</Link></li>
      {/* <li><Favorites favsPlayer={favsPlayer} favsTeam={favsTeam} /></li> */}
    </div>
  );
}

export default Sidebar;
