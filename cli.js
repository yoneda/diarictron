const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const faker = require("faker");
const { nanoid } = require("nanoid");
const dayjs = require("dayjs");

db.defaults({ notes: [], user: {} }).write();

db.set("user", { showCal: false, dark: false, start: "saturday" }).write();

db.update("notes", () =>
  [...Array(3)].map(() => ({
    id: nanoid(8),
    body: faker.lorem.word(),
    createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]"),
  }))
).write();
