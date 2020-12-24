const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const faker = require("faker");
const { nanoid } = require("nanoid");
const dayjs = require("dayjs");

db.defaults({ notes: [], user: {} }).write();
db.set("user", { showCal: false, dark: false, start: "saturday" }).write();

// process.argv is an array containing the command line arguments.
// The first element will be 'node', the second element will be the name of the JavaScript file.
// The next elements will be any additional command line arguments.
const arg = process.argv.slice(2)[0];
if (arg === "year") {
  let notes = [];
  [...Array(365)].forEach((_, index) => {
    const rand = Math.floor(Math.random() * 3);
    [...Array(rand)].forEach((_) => {
      notes.push({
        id: nanoid(8),
        body: faker.lorem.word(),
        createdAt: dayjs().add(-index, "day").format("YYYY-MM-DDTHH:mm:ss[Z]"),
      });
    });
  });
  db.set("notes", notes).write();
} else {
  db.update("notes", () =>
    [...Array(3)].map(() => ({
      id: nanoid(8),
      body: faker.lorem.word(),
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]"),
    }))
  ).write();
}
