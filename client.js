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
const { ipcRenderer } = window.require("electron");

const store = createStore({
  notes: [],
  ids: [],
  selecteds: computed(state => state.notes.filter(note => state.ids.some(id => id === note.id))),
  setNotes: action((state, payload) => {
    state.notes = payload;
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
  modal: false,
  setModal: action((state, payload) => {
    state.modal = payload;
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
  const [notes, user, modal] = useStoreState(state => [state.notes, state.user, state.modal]);
  const [getAll, setModal] = useStoreActions(actions => [actions.getAll, actions.setModal]);
  useEffect(() => {
    getAll();
  }, []);
  const addNote = useStoreActions(actions => actions.addNote);
  const [addText, setAddText] = useState("");
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
        <Main />
        {show && <Popup x={pos.x} y={pos.y} />}
      </StoreProvider>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
