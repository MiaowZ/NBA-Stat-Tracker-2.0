import React, { useEffect } from 'react';
import Team from '../components/Team';
import Player from '../components/Player';
import FavTeams from './FavTeams';
import FavPlayers from './FavPlayers';
import { Routes, Route } from 'react-router-dom';

// function Dashboard({ favsPlayer, favsTeam, setFavsPlayer, setFavsTeam }) {
//   console.log("favsPlayer in Dashboard", favsPlayer);
//   console.log("favsTeam in Dashboard", favsTeam);

//   // const playerComponents = favsPlayer.map((e) => (
//   //   <Player
//   //     favsPlayer={favsPlayer}
//   //     setFavsPlayer={setFavsPlayer}
//   //     playerId={e.player_id}
//   //   />
//   // ));

//   let playerComponents = [];

//   // useEffect(() => {
//   //   console.log('favsPlayer array updated!');
//   //   playerComponents = favsPlayer.map((e) => (
//   //     <Player
//   //       favsPlayer={favsPlayer}
//   //       setFavsPlayer={setFavsPlayer}
//   //       playerId={e.player_id}
//   //     />
//   //   ));
//   // }, [favsPlayer]);

//   for (let i = 0; i < favsPlayer.length; i++) {
//     playerComponents.push(
//       <Player
//         favsPlayer={favsPlayer}
//         setFavsPlayer={setFavsPlayer}
//         playerId={favsPlayer[i].player_id}
//         id={i}
//       />,
//     );
//   }

//   const teamComponents = favsTeam.map((teamId) => (
//     <Team favsTeam={favsTeam} setFavsTeam={setFavsTeam} teamId={teamId} />
//   ));

//   return (
//     <div id="dashboard">
//       <div id="teams">
//         <h2>Teams</h2>
//         {teamComponents}
//       </div>
//       <div id="players">
//         <h2>Players</h2>
//         {playerComponents}
//       </div>
//     </div>
//   );
// }

function Dashboard({ favsPlayer, favsTeam, setFavsPlayer, setFavsTeam }) {
  console.log("favsPlayer in Dashboard", favsPlayer);
  console.log("favsTeam in Dashboard", favsTeam);

  let playerComponents = [];
  let teamComponents = [];

  // for (let i = 0; i < favsPlayer.length; i++) {
  //   playerComponents.push(
  //     <Player
  //       favsPlayer={favsPlayer}
  //       setFavsPlayer={setFavsPlayer}
  //       playerId={favsPlayer[i].player_id}
  //       id={i}
  //     />,
  //   );
  // }

  favsPlayer.forEach((player) => {
    playerComponents.push(
      <Player
        playerId={player.player_id}
      />,
    );
  });

  // useEffect(() => {
  //   playerComponents = [];
  //   favsPlayer.forEach((player) => {
  //     playerComponents.push(
  //       <Player
  //         playerId={player.player_id}
  //       />,
  //     );
  //   });
  // }, [favsPlayer]);


  // const teamComponents = favsTeam.map((teamId) => (
  //   <Team favsTeam={favsTeam} setFavsTeam={setFavsTeam} teamId={teamId} />
  // ));

  favsTeam.forEach((team) => {
    teamComponents.push(
      <Team
        teamId={team.team_id}
      />,
    );
  });

  // useEffect(() => {
  //   teamComponents = [];
  //   favsTeam.forEach((team) => {
  //     teamComponents.push(
  //       <Team
  //         teamId={team.team_id}
  //       />,
  //     );
  //   });
  // }, [favsTeam]);

  return (
    <div id="dashboard">
      <Routes>
      <Route path = "/favorite-players" element = {<FavPlayers/>}/>
      <Route path = "/favorite-teams" element = {<FavTeams />}/>
      </Routes>
    </div>
  );
}
{/* <div id="teams">
        <h2>Teams</h2>
        {teamComponents}
      </div>
      <div id="players">
        <h2>Players</h2>
        {playerComponents}
      </div> */}
      
export default Dashboard;
