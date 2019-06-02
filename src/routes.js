const express = require('express');

const { verifyJWT } = require('./middlewares/authorization');

const TweetController = require('./controllers/TweetController');
const UserController = require('./controllers/UserController');
const { login } = require('./controllers/AuthController');

const routes = express.Router();

// Tweet
routes.get('/tweets', verifyJWT, TweetController.index);
routes.post('/tweets', verifyJWT, TweetController.store);
routes.post('/like/:id', verifyJWT, TweetController.like);
routes.delete('/tweets/:id', verifyJWT, TweetController.delete);
routes.put('/tweets/:id', verifyJWT, TweetController.update);
routes.get('/tweets/:id', verifyJWT, TweetController.getById);

// Auth
routes.post('/login', login);

// User
routes.post('/user', UserController.create);

module.exports = routes;