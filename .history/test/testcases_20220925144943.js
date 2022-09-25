const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;

const server = require("../index");

const chaiHttp = require("chai-http");
const { response } = require("express");
chai.use(chaiHttp);

describe("Get all posts sorted by post time", (req, res) => {
  it("get all posts", (done) => {
    chai
      .request(server)
      .get("/api/all_posts")
      .end((err, response) => {
        expect(response.body).to.have.all.keys("posts");
        done();
      })
      .catch(done());
  });

  describe("Authentication sucessfull", (req, res) => {
    it("Authentication of user", (done) => {
      chai
        .request(server)
        .post("/api/authenticate")
        // .set("content-type", "application/json")
        .send({ email: "testmail@gmailcom", password: "testpassword" })
        .end((err, response) => {
          if (err) {
            done(err);
          } else {
            expect(response.body).to.have.all.keys("token");
            done();
          }
          done();
        })
        .catch(done());
    });
  });
});
