# Stat-Tracker


SQL SCHEMA: 

CREATE TABLE users (
    id  SERIAL,
    name varchar,
    email  varchar, 
    profilePic varchar,
    favorited_team varchar DEFAULT NULL
);

Create Table favoritePlayers (
  id SERIAL,
  user_id INT,
  player_id INT
);

Create Table players (
  id SERIAL,
  names INT
);

Create Table favoriteTeams (
  id SERIAL,
  email varchar,
  team_id
);

Create Table teams (
  id SERIAL,
  names varchar
);






 Object

assists: 4

blocks: 0

comment: null

defReb: 1

fga: 5

fgm: 2

fgp: "40.0"

fta: 4

ftm: 4

ftp: "100"

game: {id: 10316}

min: "16:16"

offReb: 0

pFouls: 1

player: {id: 553, firstname: "Lou", lastname: "Williams"}

plusMinus: "9"

points: 9

pos: null

steals: 0

team: {id: 1, name: "Atlanta Hawks", nickname: "Hawks", code: "ATL", logo: "https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png"}

totReb: 1

tpa: 3

tpm: 1

tpp: "33.3"

turnovers: 1

