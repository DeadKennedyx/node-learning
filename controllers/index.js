const sequelize = require('sequelize');
const models = require('../database/models');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const createGame = async(request, response) => {
  try {
    const game = await models.Game.create({balance: 9, sessionID: request.sessionID});
    return response.status(201).json({
      game
    });
  } catch (error) {
    return response.status(500).json({error: error.message})
  }
}

const getSession = async(request, response) => {
  const game = await models.Game.findOne({
    where: {
      sessionID: request.sessionID
    }
  }).then(function(game){
    if(game != null){
      return response.status(200).json({
        game
      });
    }else{
      return response.status(200).json({
        sessionID: null
      });
    }
  }).catch(function (error) {
    return response.status(500).json({error: error.message})
  });
}

const updateGame = async(request, response) => {
  try {
    const game = models.Game.findOne({
      where: {
        sessionID: request.sessionID
      }
    }).then(function(game){
      newBalance = game.balance - 1
      game.update({balance: newBalance})
      return response.status(200).json({
        game
      });
    }).catch(function (error) {
      console.log(error);
    });
  } catch (error) {
    return response.status(500).json({error: error.message})
  }
}

const gameWin = async(request, response) => {
  try {
    const game = models.Game.findOne({
      where: {
        sessionID: request.sessionID
      }
    }).then(function(game){
      console.log(request);
      console.log(request.body);
      newBalance = game.balance + prizeAmount(request.body.winningLetter);
      game.update({balance: newBalance})
      return response.status(200).json({
        game
      });
    }).catch(function (error) {
      console.log(error);
    });
  } catch (error) {
    return response.status(500).json({error: error.message})
  }
}

const prizeAmount = (winningLetter) => {
  switch(winningLetter){
    case "C":
      return 10
    case "L":
      return 20
    case "O":
      return 30
    case "W":
      return 40
  }
}



module.exports = {
  createGame,
  updateGame,
  getSession,
  gameWin
}
