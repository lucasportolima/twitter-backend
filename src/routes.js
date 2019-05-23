const express = require('express');

const TweetController = require('./controllers/TweetController');

const routes = express.Router();

routes.get('/tweets', TweetController.index);
routes.post('/tweets', TweetController.store);
routes.post('/like/:id', TweetController.like);
routes.delete('/tweets/:id', TweetController.delete);
routes.put('/tweets/:id', TweetController.update);
routes.get('/tweets/:id', TweetController.getById);

module.exports = routes;