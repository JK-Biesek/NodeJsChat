var request = require('supertest');
var expect = require('chai');
var app = require('../index.js');

describe("Chat App", () => {
    it("Loads home page", (done) => {
        request(app).get("/").expect(200).end(done);
    });
    it("Loads php page", (done) => {
        request(app).get("/php").expect(200).end(done);
    });
    it("Loads java page", (done) => {
        request(app).get("/java").expect(200).end(done);
    });
    it("should fail getting not existing route", (done) => {
        request(app).get("/notFound").expect(404).end(done);
    })
});
