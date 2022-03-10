import React, { useState, useEffect } from 'react';

function Player({ playerId }) {
  const [playerName, setPlayerName] = useState('');
  const [playerHeight, setPlayerHeight] = useState('');
  const [playerBirthDate, setPlayerBirthDate] = useState('');
  const [playerCountry, setPlayerCountry] = useState('');
  const [playerWeight, setPlayerWeight] = useState('');
  const [playerCollege, setPlayerCollege] = useState('');
  const [playerJersey, setPlayerJersey] = useState('');
  const [playerPos, setPlayerPos] = useState('');

  // takes in data from basketball API to populate page with player's stats
  console.log('current player id:');
  console.log(playerId);

  const populatePlayerVitals = (data) => {
    const {
      firstname,
      lastname,
      birth,
      nba,
      height,
      weight,
      college,
      leagues,
    } = data[0];
    const name = firstname.concat(' ', lastname);
    const fullHeight = String(height.feets).concat('.', String(height.inches));
    const vitalArr = [
      name,
      fullHeight,
      birth.date,
      birth.country,
      nba.start,
      weight.pounds,
      leagues.standard.jersey,
      leagues.standard.pos,
    ];
    setPlayerName(name);
    setPlayerHeight(fullHeight);
    setPlayerBirthDate(birth.date);
    setPlayerCountry(birth.country);
    setPlayerWeight(weight.pounds);
    setPlayerBirthDate(college);
    setPlayerJersey(leagues.standard.jersey);
    setPlayerPos(leagues.standard.pos);
  };

  const getRandomKey = () => {
    const keys = process.env.keys.split(' ');
    return keys[Math.floor(Math.random() * keys.length)];
  };

  fetch(`https://api-nba-v1.p.rapidapi.com/players?id=${playerId}`, {
    headers: {
      'x-rapidapi-host': process.env.host,
      'x-rapidapi-key': getRandomKey(),
    },
  })
    .then((res) => res.json())
    .then((data) => populatePlayerVitals(data.response))
    .catch((err) => console.log('err at fetch in player', err));

  return (
    <div id="player-stats">
      <p>{playerName}</p>
      <p>{playerHeight}</p>
      <p>{playerBirthDate}</p>
      <p>{playerCountry}</p>
      <p>{playerWeight}</p>
      <p>{playerCollege}</p>
      <p>{playerJersey}</p>
      <p>{playerPos}</p>
    </div>
  );
}

export default Player;

// function Player({ favsPlayer, setFavsPlayer, playerId }) {
//   const [playerName, setPlayerName] = useState('');
//   const [playerHeight, setPlayerHeight] = useState('');
//   const [playerBirthDate, setPlayerBirthDate] = useState('');
//   const [playerCountry, setPlayerCountry] = useState('');
//   const [playerWeight, setPlayerWeight] = useState('');
//   const [playerCollege, setPlayerCollege] = useState('');
//   const [playerJersey, setPlayerJersey] = useState('');
//   const [playerPos, setPlayerPos] = useState('');

//   const [arrayNull, setArrayNull] = useState(false);
//   // utilizes QuickChart package to generate chart with player's PPG for 2021 season
//   // let ppgURL = '';
//   // const populatePlayer = (data) => {
//   //   console.log('look here for data:');
//   //   console.log(data);
//   //   const games = data.response;
//   //   const points = [];
//   //   for (let i = 0; i < games.length; i++) {
//   //     points.push(games[i].points);
//   //   }
//   //   const ppg = new QuickChart();
//   //   ppg.setWidth(500);
//   //   ppg.setHeight(300);
//   //   ppg.setConfig({
//   //     type: 'line',
//   //     data: {
//   //       labels: [...Array(games.length).keys()].map((el) => el + 1),
//   //       datasets: [
//   //         {
//   //           label: 'Points',
//   //           backgroundColor: 'rgb(255, 99, 132)',
//   //           borderColor: 'rgb(255, 99, 132)',
//   //           data: points,
//   //           fill: false,
//   //         },
//   //       ],
//   //     },
//   //     options: {
//   //       title: {
//   //         display: true,
//   //         text: 'Points per game ',
//   //       },
//   //     },
//   //   });
//   //   // document.getElementById('ppg').src = ppg.getUrl();
//   //   ppgURL = ppg.getUrl();
//   //   console.log('look here for ppgURL:');
//   //   console.log(ppgURL);
//   // };
//   // takes in data from basketball API to populate page with player's stats
//   const populatePlayerVitals = (data) => {
//     const {
//       firstname,
//       lastname,
//       birth,
//       nba,
//       height,
//       weight,
//       college,
//       leagues,
//     } = data[0];
//     const name = firstname.concat(' ', lastname);
//     const fullHeight = String(height.feets).concat('.', String(height.inches));
//     const vitalArr = [
//       name,
//       fullHeight,
//       birth.date,
//       birth.country,
//       nba.start,
//       weight.pounds,
//       college,
//       leagues.standard.jersey,
//       leagues.standard.pos,
//     ];
//     if (vitalArr.includes(null)) {
//       setArrayNull(true);
//     }
//     setPlayerName(name);
//     console.log('the player name:');
//     console.log({ playerName });
//     setPlayerHeight(fullHeight);
//     setPlayerBirthDate(birth.date);
//     setPlayerCountry(birth.country);
//     setPlayerWeight(weight.pounds);
//     setPlayerBirthDate(college);
//     setPlayerJersey(leagues.standard.jersey);
//     setPlayerPos(leagues.standard.pos);
//   };

//   // document.getElementById(theID).innerHTML = '';
//   // for (let i = 0; i < vitalArr.length; i += 1) {
//   //   const newPar = document.createElement('p');
//   //   newPar.innerText = vitalArr[i];
//   //   document.getElementById(theID).appendChild(newPar);
//   // }
//   // generates random key

//   const getRandomKey = () => {
//     const keys = process.env.keys.split(' ');
//     return keys[Math.floor(Math.random() * keys.length)];
//   };

//   // const fillVitalArr = () => {
//   //   fetch(`https://api-nba-v1.p.rapidapi.com/players?id=${playerId}`, {
//   //     headers: {
//   //       'x-rapidapi-host': process.env.host,
//   //       'x-rapidapi-key': getRandomKey(),
//   //     },
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       const {
//   //         firstname,
//   //         lastname,
//   //         birth,
//   //         nba,
//   //         height,
//   //         weight,
//   //         college,
//   //         leagues,
//   //       } = data[0];
//   //       const name = firstname.concat(' ', lastname);
//   //       const fullHeight = String(height.feets).concat('.', String(height.inches));
//   //       const vitalArr = [
//   //         name,
//   //         fullHeight,
//   //         birth.date,
//   //         birth.country,
//   //         nba.start,
//   //         weight.pounds,
//   //         college,
//   //         leagues.standard.jersey,
//   //         leagues.standard.pos,
//   //       ];
//   //       return vitalArr.map((el) => { <p>{el}</p>; });
//   //     })
//   //     .catch((err) => console.log(err));
//   // };

//   // requests player info and statistics upon initial component load
//   // points -> chart
//   useEffect(() => {
//   // fetch request for pie data
//     // fetch(
//     //   `https://api-nba-v1.p.rapidapi.com/players/statistics?id=${playerId}&season=2021`,
//     //   {
//     //     headers: {
//     //       'x-rapidapi-host': process.env.host,
//     //       'x-rapidapi-key': getRandomKey(),
//     //     },
//     //   },
//     // )
//     //   .then((res) => res.json())
//     // // check API data
//     //   .then((data) => console.log('API Data from fetch', data))
//     //   .then((data) => populatePlayer(data));

//     // Fetch request for player vital data

//     fetch(`https://api-nba-v1.p.rapidapi.com/players?id=${playerId}`, {
//       headers: {
//         'x-rapidapi-host': process.env.host,
//         'x-rapidapi-key': getRandomKey(),
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => populatePlayerVitals(data.response))
//       .catch((err) => console.log('err at fetch in player', err));
//   }, [favsPlayer]);

//   return (
//     <div id="player-stats">
//       {/* <p id={id} /> */}
//       {/* {playerName === null && <p>Could not retrieve this player from API</p>}
//       {playerName !== null && (
//       <div>
//         <p>{playerName}</p>
//         <p>{playerHeight}</p>
//         <p>{playerBirthDate}</p>
//         <p>{playerCountry}</p>
//         <p>{playerWeight}</p>
//         <p>{playerCollege}</p>
//         <p>{playerJersey}</p>
//         <p>{playerPos}</p>
//       </div>
//       )} */}
//       {playerName === null ? <p>Its null</p> : (
//         <div>
//           <p>{playerName}</p>
//           <p>{playerHeight}</p>
//           <p>{playerBirthDate}</p>
//           <p>{playerCountry}</p>
//           <p>{playerWeight}</p>
//           <p>{playerCollege}</p>
//           <p>{playerJersey}</p>
//           <p>{playerPos}</p>
//         </div>
//       )}
//     </div>

//   );
// }