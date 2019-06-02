const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('./../src/index')

chai.use(chaiHttp);
chai.should();

const mockLogin = {
	"username": "lucasportolima7",
	"password": "1234"
};

describe("Authentication", () => {
  describe("POST /", () => {
    it("Deve autenticar e retornar um token", done => {
      chai.request(app)
        .post('/login')
        .send(mockLogin)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});