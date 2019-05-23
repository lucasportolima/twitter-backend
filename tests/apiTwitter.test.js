const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert');

const app = require('./../src/index')

// Configure chai
chai.use(chaiHttp);
chai.should();

const mockTweet = {
	"author": "Mock",
	"content": "Mockado"
};

const updateContent = "Atualizado!";

let newTweet;

describe("Twitter", () => {
  describe("POST /", () => {
    it("Cadastrar um novo tweet", done => {
      chai.request(app)
        .post('/tweets')
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
        .send(mockTweet)
        .end((err, res) => {
          chai.request(app)
            .post(`/like/${ res.body._id }`)
            .end((err, res) => {
              assert.equal(res.body.likes, 1)
              done()    
            })
        })
    });
  });
  describe("GET /", () => {
    // Test to get all students record
    it("Deve trazer todos os tweets em formato de array", done => {
      chai.request(app)
        .get('/tweets')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
    it("Deve trazer tweet do id informado", done => {
      chai.request(app)
        .get(`/tweets/${ newTweet._id }`)
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
    // Test to get all students record
    it("Deve atualizar um tweet", done => {
      chai.request(app)
        .get(`/tweets/${ newTweet._id }`)
        .end((err, res) => {
          chai.request(app)
            .put(`/tweets/${ newTweet._id }`)
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
    // Test to get all students record
    it("Deve excluir um tweet", done => {
      chai.request(app)
        .delete(`/tweets/${ newTweet._id }`)
        .end((err, res) => {
          res.should.have.status(200);
          assert.ok(res.body.message, 'Tweet deletado com sucesso!');
          done();
        });
    });
  });
});