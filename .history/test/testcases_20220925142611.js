const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;

const server = require("../index");

const chaiHttp = require("chai-http");
const { response } = require("express");
chai.use(chaiHttp);

describe("first test", (req, res) => {
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
});
