const { ipcMain, app, Menu, BrowserWindow } = require("electron");
const path = require("path");
const dbPath = path.join(app.getPath("userData"), "db.json");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dbPath);
const db = low(adapter);
const electronReload = require("electron-reload");
const { chain } = require("lodash");

electronReload(path.join(__dirname, "watch", "output"));

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
  await db.get("notes").splice(0, 0, note).write();
  const notes = await db.get("notes").value();
  return notes;
});

ipcMain.handle("edit-note", async function (event, arg) {
  const { id, body, tags } = arg;
  await db
    .get("notes")
    .find({ id })
    .set("body", body)
    .set("tags", tags)
    .write();
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
    .pick(["uiStyle", "fontSize", "dark"])
    .pickBy(value => value !== undefined)
    .value();
  await db.get("user").assign(params).write();
  const user = await db.get("user").value();
  return user;
});

app.whenReady().then(() => {
  db.defaults({ notes: [], user: {} }).write();

  const template = [
    {
      label: app.name,
      submenu: [
        {
          label: `About ${app.name}`,
          click: async () => {
            console.log("test");
          }
        },
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideothers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" }
      ]
    },
    {
      label: "File",
      submenu: [{ role: "close" }]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

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
