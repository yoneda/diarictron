const initData = {
  notes: [
    {
      id: "esr11Pg6",
      body: "ratione",
      createdAt: "2021-03-23T21:07:59",
      favorite: false
    },
    {
      id: "q69VppzW",
      body: "enim",
      createdAt: "2021-03-23T21:07:59",
      favorite: false
    },
    {
      id: "KcKuERJh",
      body: "neque",
      createdAt: "2021-03-23T21:07:59",
      favorite: false
    }
  ],
  user: {
    uiStyle: "dayone",
    fontSize: "midium",
    dark: false
  },
  app: {
    showBanner: true
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
  console.log(value);
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
    console.log([note, ...notes]);
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
