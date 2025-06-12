import { expect } from 'chai';
import request from 'supertest';
import app from "../index.mjs"

describe("Testing test", () =>{
  it("should return true", () =>{
    expect(true).to.be.true;
  })

  it("should return false", () =>{
    expect(false).to.be.false;
  })
})

describe("GET /api/hello", ()=> {
  it("should return Hello, world!", async () =>{
    const res = await request(app).get("/api/hello");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", 'Hello, world!');
  })
})