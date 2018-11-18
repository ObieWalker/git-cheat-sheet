import dotenv from 'dotenv';
import app from '../app';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI_TEST, () => {
  console.log("Test Mongo is connected.")
});
const { expect } = chai;
chai.use(chaiHttp);
chai.should();


let cheatId1, cheatId2, cheatId3, categoryId, wrongId, token;

describe('Tests for cheats and categories', () => {
  after(() => {/* eslint-disable-line */
    console.log("Tests all done...")
    mongoose.disconnect();
  });

  describe('POST api/v1/users/login', () => {

    it(
      'shoud return a status 200 response for successful sign in as admin',
      (done) => {
        chai
          .request(app)
          .post('/api/v1/signin')
          .send({
            email: process.env.ADMIN1_EMAIL,
            password: process.env.ADMIN_PASSWORD
          })
          .end((err, res) => {
            expect(res).to.be.status(200);
            token = res.body.token;
            done();
          });
      }
    );
  });

  describe('GET api/v1/cheats', () => {
    it(
      'should return a status 200',
      (done) => {
        chai
          .request(app)
          .get('/api/v1/cheats')
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            cheatId1 = res.body.cheats[0]._id
            done();
          });
      }
    );
  })

  describe('GET api/v1/category', () => {
    it(
      'should return a status 200',
      (done) => {
        chai
          .request(app)
          .get('/api/v1/category')
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            categoryId = res.body.categories[0]._id
            done();
          });
      }
    );
  })

  describe('POST api/v1/cheats', () => {
    let cheat ={
      command: "Git create a new thing",
      description: "This creates a new thing to test",
      keywords: "create, origin"
    }
    it(
      'should return a status 201 for a new cheat with a new category',
      (done) => {
        chai
          .request(app)
          .post(`/api/v1/cheats?token=${token}`)
          .send({
            id: categoryId,
            cheat
          })
          .end((err, res) => {
            expect(res).to.be.status(201);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message');
            cheatId2 = res.body.cheatDetails._id
            done();
          });
      }
    );
    it(
      'should return a status 201 for a new cheat with an already created category',
      (done) => {
        chai
          .request(app)
          .post(`/api/v1/cheats?token=${token}`)
          .send({
            id: categoryId,
            cheat
          })
          .end((err, res) => {
            expect(res).to.be.status(201);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message');
            cheatId3 = res.body.cheatDetails._id
            done();
          });
      }
    );
  })

  describe('POST api/v1/category', () => {
    it(
      'should return a status 400 error for a bad input category name',
      (done) => {
        chai
          .request(app)
          .post(`/api/v1/category?token=${token}`)
          .send({
            category: "Install Git",
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("It seems category 'Install GIT' already exists, try a different category name.")
            done();
          });
      }
    );
    it(
      'should return a status 201 for a new category',
      (done) => {
        chai
          .request(app)
          .post(`/api/v1/category?token=${token}`)
          .send({
            category: "This new category",
          })
          .end((err, res) => {
            expect(res).to.be.status(201);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message')
              .to.equal("'This new category' category has been created.")
            done();
          });
      }
    );
  })

  describe('PATCH api/v1/cheats/:id', () => {
    it(
      'should return a status 404',
      (done) => {
        wrongId = cheatId3.slice(1, -1) + '00'
        chai
          .request(app)
          .patch(`/api/v1/cheats/${wrongId}?token=${token}`)
          .send({
            command: "A test command",
            description: "A simple test command",
            keywords: "command"
          })
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("No such cheat");
            done();
          });
      }
    );
    it(
      'should return a status 404',
      (done) => {
        chai
          .request(app)
          .patch(`/api/v1/cheats/${wrongId}aa?token=${token}`)
          .send({
            command: "A test command",
            description: "A simple test command",
            keywords: "command"
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("Wrong input ID");
            done();
          });
      }
    );
    it(
      'should return a status 200',
      (done) => {
        chai
          .request(app)
          .patch(`/api/v1/cheats/${cheatId3}?token=${token}`)
          .send({
            command: "A test command",
            description: "A simple test command",
            keywords: "command"
          })
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message')
              .to.equal("The cheat has been updated");
            done();
          });
      }
    );
  })

  describe('PATCH api/v1/category/:id', () => {
    it(
      'should return a status 404 for wrong Id',
      (done) => {
        chai
          .request(app)
          .patch(`/api/v1/category/${wrongId}?token=${token}`)
          .send({
            category: "Create a new Category"
          })
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("No such category");
            done();
          });
      }
    );
    it(
      'should return a status 404 for bad input',
      (done) => {
        chai
          .request(app)
          .patch(`/api/v1/category/${wrongId}aa?token=${token}`)
          .send({
            category: "Create a new Category"
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("Bad input ID");
            done();
          });
      }
    );
    it(
      'should return a status 200',
      (done) => {
        chai
          .request(app)
          .patch(`/api/v1/category/${categoryId}?token=${token}`)
          .send({
            category: "Create a new Category"
          })
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message')
              .to.equal("The category has been updated");
            done();
          });
      }
    );
  })

  describe('DELETE api/v1/cheats/:id', () => {
    it(
      'should return a status 404',
      (done) => {
        chai
          .request(app)
          .delete(`/api/v1/cheats/${wrongId}?token=${token}`)
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("No such cheat");
            done();
          });
      }
    );
    it(
      'should return a status 404',
      (done) => {
        chai
          .request(app)
          .delete(`/api/v1/cheats/${wrongId}fds?token=${token}`)
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("Bad input ID");
            done();
          });
      }
    );
    it(
      'should return a status 200',
      (done) => {
        let id = cheatId2
        chai
          .request(app)
          .delete(`/api/v1/cheats/${id}?token=${token}`)
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message')
              .to.equal("The 'Git create a new thing' cheat has been deleted.");
            done();
          });
      }
    );
  })

  describe('DELETE api/v1/category/:id', () => {
    it(
      'should return a status 400',
      (done) => {
        chai
          .request(app)
          .delete(`/api/v1/category/${wrongId}?token=${token}`)
          .end((err, res) => {
            expect(res).to.be.status(404);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("No such category");
            done();
          });
      }
    );
    it(
      'should return a status 404',
      (done) => {
        chai
          .request(app)
          .delete(`/api/v1/category/${wrongId}fds?token=${token}`)
          .end((err, res) => {
            expect(res).to.be.status(400);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(false);
            res.body.should.have
              .property('message')
              .to.equal("Bad input ID");
            done();
          });
      }
    );
    it(
      'should return a status 200',
      (done) => {
        let id = categoryId
        chai
          .request(app)
          .delete(`/api/v1/category/${id}?token=${token}`)
          .end((err, res) => {
            expect(res).to.be.status(200);
            res.body.should.have.a('object');
            res.body.should.have
              .property('success')
              .to.equal(true);
            res.body.should.have
              .property('message')
              .to.equal("The 'Create a new Category' category has been deleted.");
            done();
          });
      }
    );
  })
})
