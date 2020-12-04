const chai = require("chai");
chai.use(require("chai-json"));
chai.use(require("chai-http"));

const should = chai.should();
const expect = chai.expect;

const BASE_URL = "http://localhost:5002"; // don't put final bar here

describe("Main Service Availability", function () {
  it("Returns a 200 code", () => {
    return chai
      .request(BASE_URL)
      .get("/")
      .then((res) => res.should.have.status(200));
  });

  it("Returns a JSON response code", () => {
    return chai
      .request(BASE_URL)
      .get("/")
      .set("Content-Type", "application/json")
      .then((res) => res.should.be.json);
  });

  it("Returns expected service availability response", () => {
    return chai
      .request(BASE_URL)
      .get("/")
      .set("Content-Type", "application/json")
      .then(
        (res) => res.body.should.have.property("test").eql("OK")
        //     res.body.errors.pages.should.have.property('kind').eql('required')
        //     res.body.should.have.property('test').that.includes.all.keys(['OK'])
      );
  });
});
