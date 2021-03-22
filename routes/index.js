const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', (request, response) => response.render('index', {name: "juan"}))

router.get('/session', jsonParser, (request, response) => controllers.getSession(request, response));

router.post('/game', jsonParser, (request, response) => controllers.createGame(request, response));

router.put('/game', jsonParser, (request, response) => controllers.updateGame(request, response));

router.put('/game_win', jsonParser, (request, response) => controllers.gameWin(request, response));

module.exports = router;
