const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert');

const app = require('./../src/index')

chai.use(chaiHttp);
chai.should();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1Y2FzcG9ydG9saW1hNyIsImlhdCI6MTU1OTQ5OTk0MH0.HjoK0b2WTNSzAA5oaewghfQOC-Jzh9XWk-m1PWcdlcU'

const mockTweet = {
	"author": "5ce96820f0f9d964985a0d12",
	"content": "Mockado"
};

const updateContent = "Atualizado!";

let newTweet;

describe("Twitter", () => {
  describe("POST /", () => {
    it("Cadastrar um novo tweet", done => {
      chai.request(app)
        .post('/tweets')
        .set('Authorization', 'bearer ' + token)
        .send(mockTweet)
        .end((err, res) => {
          res.should.have.status(201);
          assert.deepEqual(mockTweet, {
            "author": res.body.author,
            "content": res.body.content
          });
          newTweet = res.body;
          done();
        });
    });
    it("Novo like no tweet", done => {
      chai.request(app)
        .post('/tweets')
        .set('Authorization', 'bearer ' + token)
        .send(mockTweet)
        .end((err, res) => {
          chai.request(app)
            .post(`/like/${ res.body._id }`)
            .set('Authorization', 'bearer ' + token)
            .end((err, res) => {
              assert.equal(res.body.likes, 1)
              done()    
            })
        })
    });
  });
  describe("GET /", () => {
    it("Deve trazer todos os tweets em formato de array", done => {
      chai.request(app)
        .get('/tweets')
        .set('Authorization', 'bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
    it("Deve trazer tweet do id informado", done => {
      chai.request(app)
        .get(`/tweets/${ newTweet._id }`)
        .set('Authorization', 'bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          assert.deepEqual(mockTweet, {
            "author": res.body.author,
            "content": res.body.content
          });
          done();
        });
    });
  });
  describe("PUT /", () => {
    it("Deve atualizar um tweet", done => {
      chai.request(app)
        .get(`/tweets/${ newTweet._id }`)
        .set('Authorization', 'bearer ' + token)
        .end((err, res) => {
          chai.request(app)
            .put(`/tweets/${ newTweet._id }`)
            .set('Authorization', 'bearer ' + token)
            .send({
              "author": res.body.author,
              "content": updateContent 
            })
            .end((err2, res2) => {
              res2.should.have.status(200);
              assert.ok(res.body.content, updateContent);
            });
          done();
        });
    });
  });
  describe("DELETE /", () => {
    it("Deve excluir um tweet", done => {
      chai.request(app)
        .delete(`/tweets/${ newTweet._id }`)
        .set('Authorization', 'bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          assert.ok(res.body.message, 'Tweet deletado com sucesso!');
          done();
        });
    });
  });
});