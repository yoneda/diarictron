const { ipcMain, app, BrowserWindow } = require("electron");
const path = require("path");
const dbPath = path.join(app.getPath("userData"), "db.json");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dbPath);
const db = low(adapter);
// const electronReload = require("electron-reload");
const { chain } = require("lodash");

// electronReload(path.join(__dirname, "watch", "output"));

ipcMain.handle("all", async function () {
  const value = await db.value();
  return value;
});

ipcMain.handle("notes", async function (event, arg) {
  const notes = await db.get("notes").value();
  return notes;
});

ipcMain.handle("add-note", async function (event, arg) {
  const { note } = arg;
  const notes = await db.get("notes").push(note).write();
  return notes;
});

ipcMain.handle("edit-note", async function (event, arg) {
  const { id, body } = arg;
  await db.get("notes").find({ id }).set("body", body).write();
  const notes = await db.get("notes").value();
  return notes;
});

ipcMain.handle("remove-note", async function (event, arg) {
  const { ids } = arg;
  await db
    .get("notes")
    .remove(note => ids.some(id => id === note.id))
    .write();
  const notes = await db.get("notes").value();
  return notes;
});

ipcMain.handle("user", async function (event, arg) {
  const user = await db.get("user").value();
  return user;
});

ipcMain.handle("update-user", async function (event, arg) {
  const params = chain(arg)
    .pick(["showCal", "dark", "start"])
    .pickBy(value => value !== undefined)
    .value();
  await db.get("user").assign(params).write();
  const user = await db.get("user").value();
  return user;
});

app.whenReady().then(() => {
  db.defaults({ notes: [], user: {} }).write();

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile("./watch/output/index.html");
});

app.on("window-all-closed", () => {
  console.log("window-all-closed");
});

app.on("activate", () => {
  console.log("activate");
});
