import dayjs from "dayjs";

const initData = {
  notes: [
    {
      id: "esr11Pg6",
      body:
        "Diarictronは日記を書くことに特化したウェブ上で動作するノートアプリです。左下のNewボタンから新規のノートを追加できます。",
      createdAt: dayjs()
        .subtract(1, "day")
        .hour(10)
        .minute(0)
        .second(0)
        .millisecond(0)
        .format("YYYY-MM-DDTHH:mm:ss"),
      favorite: false
    },
    {
      id: "q69VppzW",
      body: "ようこそ！Diarictronへ",
      createdAt: dayjs()
        .subtract(2, "day")
        .hour(10)
        .minute(0)
        .second(0)
        .millisecond(0)
        .format("YYYY-MM-DDTHH:mm:ss"),
      favorite: false
    }
  ],
  user: {
    uiStyle: "dayone",
    fontSize: "midium",
    dark: false
  },
  app: {
    showBanner: false
  }
};

// ALRET: key must be one of ['notes', 'user', 'app']
const localStorageGet = function (key) {
  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, JSON.stringify(initData[key]));
  }
  return JSON.parse(window.localStorage.getItem(key));
};

// ALERT: value must be a object
const localStorageSet = function (key, value) {
  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, JSON.stringify(initData[key]));
  }
  return window.localStorage.setItem(key, JSON.stringify(value));
};

const dbconnector = {
  getAll: () => {
    const notes = localStorageGet("notes");
    const user = localStorageGet("user");
    const app = localStorageGet("app");
    return { notes, user, app };
  },
  addNote: function ({ note }) {
    const notes = localStorageGet("notes");
    localStorageSet("notes", [note, ...notes]);
    return localStorageGet("notes");
  },
  editNote: function ({ id, body, tags, favorite }) {
    const notes = localStorageGet("notes");
    localStorageSet(
      "notes",
      notes.map(note =>
        note.id === id ? { ...note, id, body, tags, favorite } : note
      )
    );
    return localStorageGet("notes");
  },
  removeNote: function ({ ids }) {
    const notes = localStorageGet("notes");
    localStorageSet(
      "notes",
      notes.filter(note => !ids.some(id => id === note.id))
    );
    return localStorageGet("notes");
  },
  updateUser: function (payload) {
    const user = localStorageGet("user");
    localStorageSet("user", { ...user, ...payload });
    return localStorageGet("user");
  },
  getApp: () => localStorageGet("app"),
  setApp: function (payload) {
    const app = localStorageGet("app");
    localStorageSet("app", { ...app, ...payload });
    return localStorageGet("app");
  }
};

export default dbconnector;
