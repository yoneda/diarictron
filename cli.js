const { app } = require("electron");
const path = require("path");
const dbPath = path.join(app.getPath("appData"), "Easy Diary", "db.json");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dbPath);
const db = low(adapter);
const faker = require("faker");
const { nanoid } = require("nanoid");
const dayjs = require("dayjs");

app.whenReady().then(() => {
  db.defaults({ notes: [], user: {} }).write();
  db.set("user", { showCal: false, dark: false, start: "aaa" }).write();
  generate3(db);
  app.quit();
});

function generate3(db) {
  db.update("notes", () =>
    [...Array(3)].map(() => ({
      id: nanoid(8),
      body: faker.lorem.word(),
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]")
    }))
  ).write();
}

function generate365(db) {
  let notes = [];
  [...Array(365)].forEach((_, index) => {
    const rand = Math.floor(Math.random() * 3);
    [...Array(rand)].forEach(_ => {
      notes.push({
        id: nanoid(8),
        body: faker.lorem.word(),
        createdAt: dayjs()
          .subtract(356, "day")
          .add(index, "day")
          .format("YYYY-MM-DDTHH:mm:ss[Z]")
      });
    });
  });
  db.set("notes", notes).write();
}
