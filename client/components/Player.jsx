import React, { useEffect } from 'react';

const QuickChart = require('quickchart-js');

function Player({ favsPlayer, setFavsPlayer, playerId }) {
  // utilizes QuickChart package to generate chart with player's PPG for 2021 season
  const populatePlayer = (data) => {
    const games = data.response;
    const points = [];
    for (let i = 0; i < games.length; i++) {
      points.push(games[i].points);
    }
    const ppg = new QuickChart();
    ppg.setWidth(500);
    ppg.setHeight(300);
    ppg.setConfig({
      type: 'line',
      data: {
        labels: [...Array(games.length).keys()].map((el) => el + 1),
        datasets: [
          {
            label: 'Points',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: points,
            fill: false,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Points per game ',
        },
      },
    });
    document.getElementById('ppg').src = ppg.getUrl();
  };

  // takes in data from basketball API to populate page with player's stats
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
      college,
      leagues.standard.jersey,
      leagues.standard.pos,
    ];
    document.getElementById('playerVitals').innerHTML = '';
    for (let i = 0; i < vitalArr.length; i += 1) {
      const newPar = document.createElement('p');
      newPar.innerText = vitalArr[i];
      document.getElementById('playerVitals').appendChild(newPar);
    }
  };

  // generates random key
  const getRandomKey = () => {
    const keys = process.env.keys.split(' ');
    return keys[Math.floor(Math.random() * keys.length)];
  };

  // requests player info and statistics upon initial component load
  useEffect(() => {
    fetch(
      `https://api-nba-v1.p.rapidapi.com/players/statistics?id=${playerId}&season=2021`,
      {
        headers: {
          'x-rapidapi-host': process.env.host,
          'x-rapidapi-key': getRandomKey(),
        },
      }
    )
      .then((res) => res.json())
      //check API data
      .then((data) => console.log('API Data from fetch', data))
      .then((data) => populatePlayer(data));

    fetch(`https://api-nba-v1.p.rapidapi.com/players?id=${playerId}`, {
      headers: {
        'x-rapidapi-host': process.env.host,
        'x-rapidapi-key': getRandomKey(),
      },
    })
      .then((res) => res.json())
      .then((data) => populatePlayerVitals(data.response));
  }, [favsPlayer]);

  return (
    <div>
      <p id="playerVitals" />
      <img id="ppg" alt="player points per game" />
    </div>
  );

  {
  }
}

export default Player;
