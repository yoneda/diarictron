const { app, Menu } = require("electron");

module.exports = {
  createNativeMenu: () => {
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
      { role: "fileMenu" },
      { role: "editMenu" },
      { role: "viewMenu" },
      { role: "windowMenu" },
      { role: "help" }
    ];

    const menu = Menu.buildFromTemplate(template);
    return menu;
  }
};
