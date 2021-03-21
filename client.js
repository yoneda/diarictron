import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import {
  action,
  computed,
  createStore,
  StoreProvider,
  useStoreState,
  useStoreActions,
  thunk
} from "easy-peasy";
import Editor from "./Editor";
import NoteList from "./NoteList";
import Layout from "./Layout";
import Control from "./Control";
import { isSame } from "./helper";
import Popup from "./Popup";
import Dialog from "./Dialog";
import Button from "./Button";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import List from "./List";
import ListRow from "./ListRow";
import OpenInNew from "./OpenInNew";
import * as color from "./color";
import Acunit from "./Acunit";
import mousetrap from "mousetrap";
const { ipcRenderer, shell } = window.require("electron");

const Center = styled.div`
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const store = createStore({
  notes: [],
  ids: [],
  creation: "",
  selecteds: computed(state =>
    state.notes.filter(note => state.ids.some(id => id === note.id))
  ),
  length: computed(state => state.selecteds.length),
  targetNote: computed(state => (state.length === 1 ? state.selecteds[0] : {})),
  setNotes: action((state, payload) => {
    state.notes = payload;
  }),
  setCreation: action(state => {
    state.creation = nanoid(8);
  }),
  numByDate: computed(state => date =>
    state.notes.reduce(
      (acc, note) =>
        isSame(dayjs(note.createdAt), dayjs(date)) ? acc + 1 : acc,
      0
    )
  ),
  getAll: thunk((actions) => {
    ipcRenderer.invoke("all").then(({ notes, user }) => {
      actions.setNotes(notes);
      actions.setUser(user);
    });
  }),
  touch: action((state, payload) => {
    const { id } = payload;
    state.ids = [id];
  }),
  append: action((state, payload) => {
    const { id } = payload;
    state.ids.push(id);
  }),
  grep: action((state, payload) => {
    const { date } = payload;
    state.ids = state.notes
      .filter(
        note =>
          dayjs(note.createdAt).isSame(dayjs(date), "year") &&
          dayjs(note.createdAt).isSame(dayjs(date), "month")
      )
      .map(note => note.id);
  }),
  addNote: thunk((actions, payload) => {
    const { body } = payload;
    const note = {
      id: nanoid(8),
      body,
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss")
    };
    ipcRenderer.invoke("add-note", { note }).then(notes => {
      actions.setCreation();
      actions.setNotes(notes);
      actions.touch({ id: note.id });
    });
  }),
  editNote: thunk((actions, payload) => {
    const { id, body, tags } = payload;
    ipcRenderer
      .invoke("edit-note", { id, body, tags })
      .then(notes => actions.setNotes(notes));
  }),
  removeNote: thunk((actions, payload) => {
    const { ids } = payload;
    ipcRenderer
      .invoke("remove-note", { ids })
      .then(notes => actions.setNotes(notes));
  }),
  user: {},
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  updateUser: thunk((actions, payload) => {
    ipcRenderer
      .invoke("update-user", payload)
      .then(user => actions.setUser(user));
  }),
  modal: "",
  contextPoint: { x: 0, y: 0 },
  setModal: action((state, payload) => {
    state.modal = payload;
  }),
  setContextPoint: action((state, payload) => {
    state.contextPoint = payload;
  }),
  menuRect: { x: 0, y: 0, width: 0, height: 0 },
  setMenuRect: action((state, payload) => {
    state.menuRect = payload;
  }),
  preview: false,
  setPreview: action((state, payload) => {
    state.preview = payload;
  })
});

ipcRenderer.on("show-about", () => {
  store.getActions().setModal("ABOUT_DIALOG");
});

const GlobalStyle = createGlobalStyle`
  html{
    font-size: ${props => {
      if (props.theme.fontSize === "large") return 26;
      else if (props.theme.fontSize === "midium") return 18;
      else return 10;
    }}px;
  }
  body{
    user-select: none;
  }
`;

function Main() {
  const [
    ids,
    notes,
    user,
    modal,
    contextPoint,
    menuRect,
    length
  ] = useStoreState(state => [
    state.ids,
    state.notes,
    state.user,
    state.modal,
    state.contextPoint,
    state.menuRect,
    state.length
  ]);
  const [
    removeNote,
    updateUser,
    getAll,
    setModal,
    setContextPoint
  ] = useStoreActions(actions => [
    actions.removeNote,
    actions.updateUser,
    actions.getAll,
    actions.setModal,
    actions.setContextPoint
  ]);
  useKeyboard();
  useEffect(() => {
    getAll();
  }, []);
  return (
    <ThemeProvider
      theme={{
        fontSize: user.fontSize,
        dark: user.dark,
        showCal: user.showCal
      }}
    >
      <GlobalStyle />
      <Layout>
        <Layout.TopLeft />
        <Layout.TopRight />
        <Layout.Notes>
          <NoteList />
        </Layout.Notes>
        <Layout.ButtonBar>
          <Control />
        </Layout.ButtonBar>
        <Layout.Editor>
          {length === 0 ? (
            <Center>
              <Acunit />
            </Center>
          ) : length === 1 ? (
            <Editor />
          ) : length >= 2 ? (
            <Center>
              {length} notes selected
              <Button
                type="outlined"
                color={color.RED_500}
                onClick={() => removeNote({ ids: ids })}
              >
                DELETE
              </Button>
            </Center>
          ) : null}
        </Layout.Editor>
        {modal === "ABOUT_DIALOG" && (
          <Layout.FullView>
            <Dialog
              onClose={() => setModal("")}
              actions={
                <Button type="text" onClick={() => setModal("")}>
                  CLOSE
                </Button>
              }
            >
              <h3>React Diary</h3>
              <Acunit />
              <p>v1.0.0</p>
              <button onClick={() => shell.openExternal("https://github.com")}>
                Terms
              </button>
              <button onClick={() => shell.openExternal("https://github.com")}>
                Privacy
              </button>
            </Dialog>
          </Layout.FullView>
        )}
        {modal === "DROPDOWN_MENU" && (
          <Layout.FullView>
            <Popup
              onClose={() => {
                setModal("");
              }}
              left={
                menuRect.x - 125 /* current dropdown width */ + menuRect.width
              }
              top={menuRect.y + menuRect.height}
            >
              <Menu>
                <MenuItem>Markdown</MenuItem>
                <MenuItem
                  onClick={() => {
                    removeNote({ ids: ids });
                    setModal("");
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </Popup>
          </Layout.FullView>
        )}
        {modal === "SETTING_MODAL" && (
          <Layout.FullView>
            <Dialog
              title={<h3>Setting</h3>}
              onClose={() => setModal("")}
              actions={
                <Button type="text" onClick={() => setModal("")}>
                  CLOSE
                </Button>
              }
            >
              <List>
                <ListRow
                  onClick={() => updateUser({ dark: !user.dark })}
                  clickable
                  control={
                    <input
                      id="dark"
                      type="checkbox"
                      checked={user.dark}
                      onClick={() => updateUser({ dark: !user.dark })}
                    />
                  }
                >
                  <label htmlFor="dark">Dark Mode</label>
                </ListRow>
                <ListRow
                  control={
                    <select
                      id="uiStyle"
                      onChange={e => updateUser({ uiStyle: e.target.value })}
                      value={user.uiStyle}
                    >
                      <option value="normal">Normal</option>
                      <option value="dayone">Dayone</option>
                    </select>
                  }
                >
                  <label htmlFor="uiStyle">UI Style</label>
                </ListRow>
                <ListRow
                  control={
                    <select
                      id="fontSize"
                      onChange={e => updateUser({ fontSize: e.target.value })}
                      value={user.fontSize}
                    >
                      <option value="small">small</option>
                      <option value="midium">midium</option>
                      <option value="large">large</option>
                    </select>
                  }
                >
                  <label htmlFor="fontSize">Font Size</label>
                </ListRow>
                <ListRow
                  clickable
                  onClick={() => console.log("export notes")}
                  control={<OpenInNew />}
                >
                  Export Notes
                </ListRow>
              </List>
            </Dialog>
          </Layout.FullView>
        )}
        {modal === "CONTEXT_MODAL" && (
          <Layout.FullView>
            <Popup
              onClose={() => {
                setModal("");
                setContextPoint({ x: 0, y: 0 });
              }}
              left={contextPoint.x}
              top={contextPoint.y}
            >
              <Menu>
                <MenuItem
                  onClick={() => {
                    removeNote({ ids: ids });
                    setModal("");
                    setContextPoint({ x: 0, y: 0 });
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </Popup>
          </Layout.FullView>
        )}
      </Layout>
    </ThemeProvider>
  );
}

function useKeyboard() {
  const [modal, user, preview, ids] = useStoreState(state => [
    state.modal,
    state.user,
    state.preview,
    state.ids
  ]);
  const [
    addNote,
    setModal,
    updateUser,
    setPreview,
    removeNote
  ] = useStoreActions(actions => [
    actions.addNote,
    actions.setModal,
    actions.updateUser,
    actions.setPreview,
    actions.removeNote
  ]);
  useEffect(() => {
    mousetrap.bind("command+/", () =>
      modal === "" ? setModal("SETTING_MODAL") : setModal("")
    );
    mousetrap.bind("command+shift+/", () =>
      modal === "" ? setModal("ABOUT_DIALOG") : setModal("")
    );
    mousetrap.bind("command+shift+n", () => addNote({ body: "New" }));
    mousetrap.bind("command+shift+m", () => updateUser({ dark: !user.dark }));
    mousetrap.bind("command+shift+p", () => setPreview(!preview));
    mousetrap.bind("command+shift+o", () => console.log("output all notes"));
    mousetrap.bind("backspace", () => removeNote({ ids: ids }));
    return () => [
      mousetrap.unbind("command+/"),
      mousetrap.unbind("command+shift+/"),
      mousetrap.unbind("command+shift+n"),
      mousetrap.unbind("command+shift+m"),
      mousetrap.unbind("command+shift+p"),
      mousetrap.unbind("command+shift+o"),
      mousetrap.unbind("backspace")
    ];
  }, [modal, user, preview, ids]);
}

function App() {
  return (
    <Fragment>
      <StoreProvider store={store}>
        <Reset />
        <Main />
      </StoreProvider>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
