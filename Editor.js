import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Reset } from "styled-reset";
import dayjs from "dayjs";
import {
  action,
  createStore,
  StoreProvider,
  useStoreState,
  useStoreActions
} from "easy-peasy";

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  border: solid 1px black;
  padding: 10px;
  box-sizing: border-box;
`;

const EditArea = styled.textarea`
  resize: none;
  line-height: 1;
  font-size: 1.5rem;
`;

const Svg = styled.svg`
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
  &:active {
    background-color: gainsboro;
  }
`;

function Trash() {
  return (
    <Svg
      className="icon icon-tabler icon-tabler-trash"
      height="24"
      width="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      <line x1="4" x2="20" y1="7" y2="7" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </Svg>
  );
}

function Editor() {
  const note = useStoreState(state => state.selected);
  const [editNote, removeNote] = useStoreActions(actions => [
    actions.editNote,
    actions.removeNote
  ]);
  return (
    <Wrapper>
      {note ? (
        <Fragment>
          <EditArea
            cols={12}
            rows={4}
            value={note.body}
            onChange={e => editNote({ id: note.id, body: e.target.value })}
          />
          <span onClick={() => removeNote({ id: note.id })}>
            <Trash />
          </span>
        </Fragment>
      ) : (
        "empty"
      )}
    </Wrapper>
  );
}

export default Editor;
