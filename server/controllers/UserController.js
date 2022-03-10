const path = require('path');
const { OAuth2Client } = require('google-auth-library');
// const User = require('../models/UserModels');//mongo
const db = require('../models/UserModels');

const { CLIENT_ID } = process.env;
const client = new OAuth2Client(CLIENT_ID);

const UserController = {
  // Create a new user in the Database
  // Their information will be sent in the request body
  // This should send the created user back to the client

  authUser: async (req, res, next) => {
    try {
      // pul JWT from the request header

      const { credential } = req.body;

      // use the JWT to get the user's profile from Google
      const ticket = await client.verifyIdToken({
        // pass the JWT to verify
        idToken: credential,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        requiredAudience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });

      // get the user's profile from Google
      const payload = ticket.getPayload();
      // pull the user's profile information from the profile
      const { name, email, picture } = payload;
      console.log('payload: ', payload);

      // check if the user is already in our database
      // let user = await User.findOne({ email: email.split('@')[0] });
      const userQuery = 'Select * FROM users WHERE email = $1;';
      const values = [name, email, picture];
      const user = await db.query(userQuery, [email.split('@')[0]]);

      if (!user) {
        // create a new user if the user is not in our database
        // user = await User.create({ name, email: email.split('@')[0], picture });
        const addUserQuery = 'INSERT INTO users (name, email, picture) VALUES ($1, $2, $3);';
        db.query(addUserQuery, values);
      }
      res.cookie('email', email.split('@')[0]);
      // send the user back to the client
      res.locals.user = user;
      res.locals.credential = credential;
      next();
    } catch (err) {
      next(err);
    }
  },

  getTeams(req, res, next) {
    const getFavTeamQuery = 'SELECT team_id FROM favoriteTeams WHERE email = $1;';
    console.log('cookies', req.cookies.email);
    db.query(getFavTeamQuery, [req.cookies.email])
      .then((data) => {
        // console.log('get Teams', data.rows);
        res.locals.teams = data.rows;
        return next();
      })
      .catch((err) => next({
        log: `Error occured in getTeams Controller: ${err}`,
        status: 400,
        message: { err: 'Was not able to get teams' },
      }));
  },

  getPlayers(req, res, next) {
    const getFavPlayerQuery = 'SELECT player_id FROM favoritePlayers WHERE email = $1;';
    db.query(getFavPlayerQuery, [req.cookies.email])
      .then((data) => {
        console.log('get Players', data.rows);
        res.locals.players = data.rows;
        return next();
      })
      .catch((err) => next({
        log: `Error occured in getPlayers Controller: ${err}`,
        status: 400,
        message: { err: 'Was not able to get players' },
      }));
  },

  addTeam(req, res, next) {
    const { teamId } = req.params;
    console.log('team id as param');
    console.log(teamId);

    // const addTeamQuery = 'INSERT INTO favoriteTeams (email, team_id) VALUES ($1, $2) ON CONFLICT (email, team_id) DO NOTHING;';
    const addTeamQuery = 'INSERT INTO favoriteTeams (email, team_id) VALUES ($1, $2);';
    const values = [req.cookies.email, teamId];

    db.query(addTeamQuery, values)
      .then(next())
      .catch((err) => next({
        log: `Error occured in addTeam Controller: ${err}`,
        status: 400,
        message: { err: 'Was not able to add team' },
      }));

    // query.favorited_teams = teamId;
    // User.findOneAndUpdate(
    //   { email: req.cookies.email },
    //   { $addToSet: query },
    //   { new: true },
    //   (err, user) => {
    //     if (err) {
    //       return next({
    //         log: 'Error in addTeam middleware',
    //         message: { err: 'An error occurred while trying to add a team' },
    //       });
    //     }
    //     res.locals.teams = user.favorited_teams;
    //     return next();
    //   }
    // );
  },

  removeTeam(req, res, next) {
    const { teamId } = req.params;

    const removeTeamQuery = 'DELETE FROM favoriteTeams VALUES ($1, $2);';
    const values = [req.cookies.email, teamId];

    const getFavTeamQuery = 'SELECT team_id FROM favoriteTeams WHERE email = $1;';

    db.query(removeTeamQuery, values)
      .then(() => db.query(getFavTeamQuery, [req.cookies.email])
        .then(() => {
          res.locals.teams = user.favorited_teams;
          return next();
        }))
      .catch((err) => next(err));

    query.favorited_teams = teamId;
    User.findOneAndUpdate(
      { email: req.cookies.email },
      { $pull: query },
      { new: true },
      (err, user) => {
        if (err) {
          return next({
            log: 'Error in addTeam middleware',
            message: { err: 'An error occurred while trying to remove a team' },
          });
        }
        res.locals.teams = user.favorited_teams;
        return next();
      },
    );
  },

  addPlayer(req, res, next) {
    const { playerId } = req.params;

    const addPlayer = 'INSERT INTO favoritePlayers (email, player_id) VALUES ($1, $2);';
    const values = [req.cookies.email, playerId];

    db.query(addPlayer, values)
      .then(next())
      .catch((err) => next({
        log: `Error occured in addPlayer Controller: ${err}`,
        status: 400,
        message: { err: 'Was not able to add player' },
      }));
  },

  // addPlayer(req, res, next) {
  //   const { playerId } = req.params;
  //   const query = {};
  //   query.favorited_players = playerId;
  //   User.findOneAndUpdate(
  //     { email: req.cookies.email },
  //     { $addToSet: query },
  //     { new: true },
  //     (err, user) => {
  //       if (err) {
  //         return next({
  //           log: 'Error in addPlayer middleware',
  //           message: {
  //             err: 'An error occurred while trying to add a player',
  //           },
  //         });
  //       }
  //       res.locals.players = user.favorited_players;
  //       return next();
  //     }
  //   );
  // },

  //  removePlayer(req, res, next) {
  //   const { playerId } = req.params;
  //   const query = {};
  //   query.favorited_players = playerId;
  //   User.findOneAndUpdate(
  //     { email: req.cookies.email },
  //     { $pull: query },
  //     { new: true },
  //     (err, user) => {
  //       if (err) {
  //         return next({
  //           log: 'Error in addPlayer middleware',
  //           message: {
  //             err: 'An error occurred while trying to remove a player',
  //           },
  //         });
  //       }
  //       res.locals.players = user.favorited_players;
  //       return next();
  //     }
  //   );
  // },
};

// removePlayer(req, res, next) {
//   const { playerId } = req.params;
//   const query = {};
//   query.favorited_players = playerId;
//   User.findOneAndUpdate(
//     { email: req.cookies.email },
//     { $pull: query },
//     { new: true },
//     (err, user) => {
//       if (err) {
//         return next({
//           log: 'Error in addPlayer middleware',
//           message: {
//             err: 'An error occurred while trying to remove a player',
//           },
//         });
//       }
//       res.locals.players = user.favorited_players;
//       return next();
//     }
//   );
// },
// };

module.exports = UserController;
