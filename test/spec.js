var supertest = require("supertest");
var should = require("should");
var developmentServerUrl = "http://localhost:3000";
var server = supertest.agent(developmentServerUrl);

describe("Get user",function(){
  it("should get user", function(done){
    server
    .get("/api/user")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });
});
