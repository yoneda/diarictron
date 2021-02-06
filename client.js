import React, { Fragment, useEffect, useState } from "react";
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
import Setting from "./Setting";
import Layout from "./Layout";
import Control from "./Control";
import { isSame } from "./helper";
import Modal from "./Modal";
import Popup from "./Popup";
const { ipcRenderer } = window.require("electron");

const store = createStore({
  notes: [],
  ids: [],
  creation: "",
  selecteds: computed(state => state.notes.filter(note => state.ids.some(id => id === note.id))),
  setNotes: action((state, payload) => {
    state.notes = payload;
  }),
  setCreation: action(state => {
    state.creation = nanoid(8);
  }),
  numByDate: computed(state => date =>
    state.notes.reduce(
      (acc, note) => (isSame(dayjs(note.createdAt), dayjs(date)) ? acc + 1 : acc),
      0
    )
  ),
  getAll: thunk((actions, payload) => {
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
  addNote: thunk((actions, payload) => {
    const { body } = payload;
    const note = {
      id: nanoid(8),
      body,
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]")
    };
    ipcRenderer.invoke("add-note", { note }).then(notes => {
      actions.setCreation();
      actions.setNotes(notes);
      actions.touch({ id: note.id });
    });
  }),
  editNote: thunk((actions, payload) => {
    const { id, body, tags } = payload;
    ipcRenderer.invoke("edit-note", { id, body, tags }).then(notes => actions.setNotes(notes));
  }),
  removeNote: thunk((actions, payload) => {
    const { ids } = payload;
    ipcRenderer.invoke("remove-note", { ids }).then(notes => actions.setNotes(notes));
  }),
  user: {},
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  updateUser: thunk((actions, payload) => {
    ipcRenderer.invoke("update-user", payload).then(user => actions.setUser(user));
  }),
  modal: "",
  contextPoint: { x: 0, y: 0 },
  setModal: action((state, payload) => {
    state.modal = payload;
  }),
  setContextPoint: action((state, payload) => {
    state.contextPoint = payload;
  })
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
  const [ids, notes, user, modal, contextPoint] = useStoreState(state => [
    state.ids,
    state.notes,
    state.user,
    state.modal,
    state.contextPoint
  ]);
  const [removeNote, getAll, setModal, setContextPoint] = useStoreActions(actions => [
    actions.removeNote,
    actions.getAll,
    actions.setModal,
    actions.removeNote,
    actions.setContextPoint
  ]);
  useEffect(() => {
    getAll();
  }, []);
  return (
    <ThemeProvider theme={{ fontSize: user.fontSize, dark: user.dark, showCal: user.showCal }}>
      <GlobalStyle />
      <Layout>
        <Layout.Notes>
          <NoteList />
        </Layout.Notes>
        <Layout.Control>
          <Control />
        </Layout.Control>
        <Layout.Editor>
          <Editor />
        </Layout.Editor>
        {modal === "SETTING_MODAL" && (
          <Layout.Modal>
            <Modal onClose={() => setModal("")}>
              <Setting onClose={() => setModal("")} />
            </Modal>
          </Layout.Modal>
        )}
        {modal === "POPUP_MODAL" && (
          <Layout.Modal>
            <Popup
              onClose={() => {
                setModal("");
                setContextPoint({ x: 0, y: 0 });
              }}
              left={contextPoint.x}
              top={contextPoint.y}
            >
              <button
                onClick={() => {
                  removeNote({ ids: ids });
                  setModal("");
                  setContextPoint({ x: 0, y: 0 });
                }}
              >
                削除
              </button>
            </Popup>
          </Layout.Modal>
        )}
      </Layout>
    </ThemeProvider>
  );
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
