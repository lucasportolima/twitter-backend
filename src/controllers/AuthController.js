const User = require('../models/User');
const { comparePassword } = require('../middlewares/authorization');
const Jwt = require('jsonwebtoken');

const JWT_KEY = 'brucutuutucurb';

const USER = {
  username: 'xuxadasilva',
  password: '123'
}

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send({ message: "Usuário não encontrado!" });
    if (
      !(await comparePassword(password, user.userToken))
    ) return res.status(401).send({ message: "Senha errada ladrão!" });
      
    return res.status(200).send({
      token: Jwt.sign({ username: username }, JWT_KEY)
    })
  }
}