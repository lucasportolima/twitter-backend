const Jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const JWT_KEY = 'brucutuutucurb';

module.exports = { 
  verifyJWT(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    Jwt.verify(token, JWT_KEY, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  },

  async encryptPassword(password) {
    return await bcrypt.hashSync(password, saltRounds, (err, hash) => hash);
  },

  async comparePassword(password, hash) {
    return await bcrypt.compareSync(password, hash, (err, res) => res);
  }
}