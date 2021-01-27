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
import Calendar from "./Calendar";
import Setting from "./Setting";
import Layout from "./Layout";
import Control from "./Control";
import { isSame } from "./helper";
import Modal from "./Modal";
const { ipcRenderer } = window.require("electron");

const store = createStore({
  notes: [],
  id: -1,
  selected: computed(state => state.notes.find(note => note.id === state.id)),
  setNotes: action((state, payload) => {
    state.notes = payload;
  }),
  numByDate: computed(state => date =>
    state.notes.reduce(
      (acc, note) =>
        isSame(dayjs(note.createdAt), dayjs(date)) ? acc + 1 : acc,
      0
    )
  ),
  getAll: thunk((actions, payload) => {
    ipcRenderer.invoke("all").then(({ notes, user }) => {
      actions.setNotes(notes);
      actions.setUser(user);
    });
  }),
  tapNote: action((state, payload) => {
    const { id } = payload;
    state.id = id;
  }),
  addNote: thunk((actions, payload) => {
    const { body } = payload;
    const note = {
      id: nanoid(8),
      body,
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]")
    };
    ipcRenderer.invoke("add-note", { note }).then(notes => {
      actions.setNotes(notes);
      actions.tapNote({ id: note.id });
    });
  }),
  editNote: thunk((actions, payload) => {
    const { id, body } = payload;
    ipcRenderer
      .invoke("edit-note", { id, body })
      .then(notes => actions.setNotes(notes));
  }),
  removeNote: thunk((actions, payload) => {
    const { id } = payload;
    ipcRenderer
      .invoke("remove-note", { id })
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
  modal: false,
  setModal: action((state, payload) => {
    console.log({ modal: state.modal });
    console.log(payload);
    state.modal = payload;
  })
});

const GlobalStyle = createGlobalStyle`
  body{
    font-size: 20px;
    user-select: none;
  }
`;

function Main() {
  const [notes, user, modal] = useStoreState(state => [
    state.notes,
    state.user,
    state.modal
  ]);
  const [getAll, setModal] = useStoreActions(actions => [
    actions.getAll,
    actions.setModal
  ]);
  useEffect(() => {
    getAll();
  }, []);
  const addNote = useStoreActions(actions => actions.addNote);
  const [addText, setAddText] = useState("");
  return (
    <ThemeProvider theme={{ dark: user.dark, showCal: user.showCal }}>
      <Layout>
        <Layout.Notes>
          <NoteList />
        </Layout.Notes>
        <Layout.Control>
          <Control />
        </Layout.Control>
        <Layout.Line />
        <Layout.Editor>
          <Editor />
        </Layout.Editor>
        {modal && (
          <Layout.Modal>
            <Modal onClose={() => setModal(false)}>
              <Setting onClose={() => setModal(false)} />
            </Modal>
          </Layout.Modal>
        )}
      </Layout>
    </ThemeProvider>
  );
}

const Popup = styled.div`
  width: 50px;
  height: 50px;
  background: tomato;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
`;

function App() {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    window.addEventListener("contextmenu", event => {
      event.preventDefault();
      setShow(true);
      setPos({ x: event.clientX, y: event.clientY });
    });
  }, []);
  return (
    <Fragment>
      <StoreProvider store={store}>
        <Reset />
        <GlobalStyle />
        <Main />
        {show && <Popup x={pos.x} y={pos.y} />}
      </StoreProvider>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
