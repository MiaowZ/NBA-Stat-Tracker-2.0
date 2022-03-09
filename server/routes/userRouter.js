const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

router.post('/addTeam/:teamId', userController.addTeam, userController.getTeams, (req, res) => {
  return res.status(200).json(res.locals.teams);
});

router.post('/addPlayer/:playerId', userController.addPlayer, userController.getPlayers, (req, res) => {
  return res.status(200).json(res.locals.players);
});

router.post('/removeTeam/:teamId', userController.removeTeam, userController.getTeams, (req, res) => {
  return res.status(200).json(res.locals.teams);
});

// router.post('/removePlayer/:playerId', userController.removePlayer, (req, res) => {
//   return res.status(200).json({ players: res.locals.players });
//  });

module.exports = router;
