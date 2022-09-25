const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;

const server = require("../index");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("first test", (req, res) => {
  it("get something");
});
