import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import dayjs from "dayjs";
import {
  action,
  computed,
  createStore,
  StoreProvider,
  useStoreState,
  useStoreActions,
} from "easy-peasy";
import Editor from "./Editor";
import NoteList from "./NoteList";
import Calendar from "./Calendar";

let count = 3;

const store = createStore({
  notes: [
    { id: 0, body: "aaa", createdAt: "2020-11-15" },
    { id: 1, body: "bbb", createdAt: "2020-11-15" },
    { id: 2, body: "ccc", createdAt: "2020-11-15" }
  ],
  id: -1,
  selected: computed((state) =>
    state.notes.find((note) => note.id === state.id)
  ),
  tapNote: action((state, payload) => {
    const { id } = payload;
    state.id = id;
  }),
  addNote: action((state, payload) => {
    const { body } = payload;
    const today = dayjs().format("YYYY-M-D H:mm:ss");
    const note = { id: count, body, createdAt: today };
    state.notes.push(note);
    count = count + 1;
  }),
  editNote: action((state, payload) => {
    const { id, body } = payload;
    state.notes = state.notes.map((note) =>
      note.id === id ? { ...note, body } : note
    );
  }),
  removeNote: action((state, payload) => {
    const { id } = payload;
    state.notes = state.notes.filter((note) => note.id !== id);
  }),
});

const GlobalStyle = createGlobalStyle`
  body{
    font-size: 15px;
  }
`;

function Main() {
  const notes = useStoreState((state) => state.notes);
  const [addNote, editNote, removeNote] = useStoreActions((actions) => [
    actions.addNote,
    actions.editNote,
    actions.removeNote,
  ]);
  const [addText, setAddText] = useState("");
  const [editText, setEditText] = useState("");
  const [editIndex, setEditIndex] = useState(0);
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
