const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("./out/output/index.html");
});

app.on("window-all-closed", () => {
  console.log("window-all-closed");
});

app.on("activate", () => {
  console.log("activate");
});
