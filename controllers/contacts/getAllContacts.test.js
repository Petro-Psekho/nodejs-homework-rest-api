const getAllContacts = require("./getAllContacts");
const express = require("express");
const req = require("supertest");

const app = express();
app.get("/api/contacts", getAllContacts);

describe("status 200", () => {
  beforeAll(() => app.listen(3000));

  test("getAllContacts return contacts", async () => {
    const res = await req(app).get("/api/contacts");
    console.log(req.status);
  });
});
