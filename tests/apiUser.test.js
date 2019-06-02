const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert');

const { comparePassword } = require('../src/middlewares/authorization');

const app = require('./../src/index')

chai.use(chaiHttp);
chai.should();

const mockUser = {
	"username": Math.random().toString(36).substring(10),
  "password": Math.random().toString(36).substring(10),
  "name": Math.random().toString(36).substring(10),
	"email": `${ Math.random().toString(36).substring(10) }@${ Math.random().toString(36).substring(10) }.com`
};

describe("User", () => {
  describe("POST /", () => {
    it("Create new user", done => {
      chai.request(app)
        .post('/user')
        .send(mockUser)
        .end((err, res) => {
          res.should.have.status(201);
          assert.ok(comparePassword(mockUser.password, res.body.password));
          mockUser.password = '';
          assert.deepEqual(mockUser, {
            "username": res.body.username,
            "password": '',
            "name": res.body.name,
            "email": res.body.email
          });
          done();
        });
    });
  });
});