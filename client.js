import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
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
  thunk,
} from "easy-peasy";
import Editor from "./Editor";
import NoteList from "./NoteList";
import Calendar from "./Calendar";
import Setting from "./Setting";
import Layout from "./Layout";
const { ipcRenderer } = window.require("electron");

const store = createStore({
  notes: [],
  id: -1,
  selected: computed((state) =>
    state.notes.find((note) => note.id === state.id)
  ),
  setNotes: action((state, payload) => {
    state.notes = payload;
  }),
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
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]"),
    };
    ipcRenderer
      .invoke("add-note", { note })
      .then((notes) => actions.setNotes(notes));
  }),
  editNote: thunk((actions, payload) => {
    const { id, body } = payload;
    ipcRenderer
      .invoke("edit-note", { id, body })
      .then((notes) => actions.setNotes(notes));
  }),
  removeNote: thunk((actions, payload) => {
    const { id } = payload;
    ipcRenderer
      .invoke("remove-note", { id })
      .then((notes) => actions.setNotes(notes));
  }),
  user: {},
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  updateUser: thunk((actions, payload) => {
    ipcRenderer
      .invoke("update-user", payload)
      .then((user) => actions.setUser(user));
  }),
});

const GlobalStyle = createGlobalStyle`
  body{
    font-size: 20px;
    user-select: none;
  }
`;

function Main() {
  const [notes, user] = useStoreState((state) => [state.notes, state.user]);
  const getAll = useStoreActions((actions) => actions.getAll);
  useEffect(() => {
    getAll();
  }, []);
  const addNote = useStoreActions((actions) => actions.addNote);
  const [addText, setAddText] = useState("");
  const onAddClick = () => {
    addNote({ body: addText });
    setAddText("");
  };
  return (
    <Layout>
      <Layout.Calendar>
        <Calendar />
      </Layout.Calendar>
      <Layout.Notes>
        <NoteList />
      </Layout.Notes>
      <Layout.Control>
        <div>add:</div>
        <input
          type="text"
          value={addText}
          onChange={(e) => setAddText(e.target.value)}
        />
        <button onClick={onAddClick}>post</button>
      </Layout.Control>

      <Layout.Line />
      <Layout.Editor>
        <Editor />
      </Layout.Editor>
    </Layout>
  );
}

const Popup = styled.div`
  width: 50px;
  height: 50px;
  background: tomato;
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;

function App() {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    window.addEventListener("contextmenu", (event) => {
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
