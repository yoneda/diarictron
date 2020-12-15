const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const faker = require("faker");
const { nanoid } = require("nanoid");

db.defaults({ notes: [], user: {} }).write();

db.set("user", { showCal: true, dark: false }).write();

db.update("notes", () =>
  [...Array(3)].map(() => ({
    id: nanoid(8),
    body: faker.lorem.word(),
    createdAt: "2020-12-15",
  }))
).write();
