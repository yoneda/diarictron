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
  getAll: thunk((actions, payload) =>
    ipcRenderer.invoke("notes").then((notes) => actions.setNotes(notes))
  ),
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
});

const GlobalStyle = createGlobalStyle`
  body{
    font-size: 15px;
  }
`;

function Main() {
  const notes = useStoreState((state) => state.notes);
  const getAll = useStoreActions((actions) => actions.getAll);
  useEffect(() => {
    getAll();
  }, []);
  const [addNote, editNote, removeNote] = useStoreActions((actions) => [
    actions.addNote,
    actions.editNote,
    actions.removeNote,
  ]);
  const [addText, setAddText] = useState("");
  const [editText, setEditText] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const [removeIndex, setRemoveIndex] = useState(0);
  const onAddClick = () => {
    addNote({ body: addText });
    setAddText("");
  };
  const onEditClick = () => {
    editNote({ id: editIndex, body: editText });
    setEditText("");
  };
  const onRemoveClick = () => {
    removeNote({ id: removeIndex });
    setRemoveIndex(0);
  };
  return (
    <Fragment>
      <div>add:</div>
      <input
        type="text"
        value={addText}
        onChange={(e) => setAddText(e.target.value)}
      />
      <button onClick={onAddClick}>post</button>
      <div>edit:</div>
      <input
        type="number"
        value={editIndex}
        onChange={(e) => setEditIndex(parseInt(e.target.value))}
      />
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />
      <button onClick={onEditClick}>post</button>
      <div>delete:</div>
      <input
        type="number"
        value={removeIndex}
        onChange={(e) => setRemoveIndex(parseInt(e.target.value))}
      />
      <button onClick={onRemoveClick}>post</button>
      <div>notes:</div>
      <NoteList />
      <Editor />
      <Calendar />
      <input
        type="file"
        multiple
        onChange={(e) => {
          let reader = new FileReader();
          reader.onload = function (event) {
            console.log(event.target.result);
          };
          reader.readAsText(e.target.files[0]);
        }}
      />
      <br />
      <button onClick={() => doTest()}>テストボタン</button>
    </Fragment>
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
