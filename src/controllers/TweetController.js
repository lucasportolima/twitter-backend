const Tweet = require('../models/Tweet');

module.exports = {
  async index(req, res) {
    const tweets = await Tweet.find({}).sort('-createdAt');

    return res.json(tweets);
  },

  async store(req, res) {
    const tweet = await Tweet.create(req.body);

    req.io.emit('tweet', tweet);

    return res.status(201).send(tweet);
  },

  async getById(req, res) {
    const tweet = await Tweet.findById(req.params.id);
    return res.status(200).send(tweet);
  },

  async update(req, res) {
    const tweet = await Tweet.findById(req.params.id);

    tweet.content = req.body.content;
    tweet.save();

    return res.status(200).send(tweet);
  },

  async delete(req, res) {
    await Tweet.findByIdAndRemove(req.params.id, (err, tasks) => {
      if (err) return res.status(500).send(err);
      const response = {
          message: "Tweet deletado com sucesso!",
          id: req.params.id
      };
      return res.status(200).send(response);
    })
  },

  async like(req, res) {
    const tweet = await Tweet.findById(req.params.id);

    tweet.set({ likes: tweet.likes + 1 });
    
    await tweet.save();

    req.io.emit('like', tweet);

    return res.json(tweet);
  }
}