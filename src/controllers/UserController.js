const User = require('../models/User');
const { encryptPassword, comparePassword } = require('../middlewares/authorization');

module.exports = {
  async create(req, res) {
    req.body.userToken = await encryptPassword(req.body.password);
    const user = await User.create(req.body);
    return res.status(201).send(user);
  }
}