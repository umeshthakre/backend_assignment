const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;

const server = require("../index");

const chaiHttp = require("chai-http");
const { response } = require("express");
chai.use(chaiHttp);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMyZWNmYWQ0OWRmOWVjNWRlODZlOWFiIiwiZW1haWwiOiJ0ZXN0bWFpbEBnbWFpbGNvbSIsImlhdCI6MTY2NDAyNjQyMCwiZXhwIjoxNjY0ODI1NjIwfQ.aMpcCEkc2OwHQajcI3t_kpfyQWYnJA5OKENUzPBlbjA";

describe("Get all posts sorted by post time", (req, res) => {
  it("get all posts", (done) => {
    chai
      .request(server)
      .get("/api/all_posts")
      .end((err, response) => {
        expect(response.body).to.have.all.keys("posts");
        done();
      });
  });

  //   describe("Authentication sucessfull", (req, res) => {
  //     const body = { email: "testmail@gmailcom", password: "testpassword" };

  //     it("Authentication of user", (done) => {
  //       chai
  //         .request(server)
  //         .post("/api/authenticate")
  //         .set("content-type", "application/json")
  //         .send({ email: "testmail@gmailcom", password: "testpassword" })
  //         .end((err, response) => {
  //           if (err) {
  //             done(err);
  //           }
  //           expect(response.body).to.have.all.keys("token");
  //           done();
  //         });
  //     });
  //   });

  describe("follow user", (req, res) => {
    it("follow user", (done) => {
      chai
        .request(server)

        .post("/api/follow/632ecfad49df9ec5de86e9ab")
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          if (err) {
            done(err);
          } else {
            done();
            expect(response.body).to.have.all.property("mesg");
          }
        });
    });
  });

  describe("Post getting created", (req, res) => {
    it("create post", (done) => {
      chai
        .request(server)
        .post("/api/posts/")
        .send({
          title: "from mocha test",
          description: "this is the post from mocha ",
        })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          if (err) {
            done(err);
          }

          expect(response.body).to.have.all.property("title");

          done(err);
        });
    });
  });

  describe("Post getting deleted", (req, res) => {
    it("delete post", (done) => {
      chai
        .request(server)
        .delete("/api/posts/632f13934bf328c68c581a73")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          if (err) {
            done(err);
          }
          expect(response.body).to.have.property("mesg");
          done();
        });
    });
  });

  describe("Post getting liked", (req, res) => {
    it("post getting liked by user", (done) => {
      chai
        .request(server)
        .post("/api/like/632f13934bf328c68c581a73")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          if (err) {
            done(err);
          }
          expect(response.body).to.have.property("msg");
          done();
        });
    });
  });

  describe("Comment getting added to the post", (req, res) => {
    it("Comment gettting added to the post with given id", (done) => {
      chai
        .request(server)
        .post("/api/comment/632f13934bf328c68c581a73")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          if (err) {
            done(err);
          }
          expect(response.body).to.have.property("mesg");
          done();
        });
    });
  });

  describe("get a single post", (req, res) => {
    it("getting a single post with given id", (done) => {
      chai
        .request(server)
        .get("/api/post/632f13934bf328c68c581a73")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          if (err) {
            done(err);
          }
          expect(response.body).to.have.property("id");
          done();
        });
    });
  });
});
