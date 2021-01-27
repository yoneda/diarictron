import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import { humanDate } from "./helper";

const Wrapper = styled.div`
  border: 1px solid black;
  height: 100vh;
  display: grid;
  box-sizing: border-box;
  padding: 20px;

  display: grid;
  grid-template-rows: 40px 1fr 40px;
  grid-template-columns: 1fr 80px;
`;

const Datetime = styled.div`
  grid-row: 1/2;
  grid-column: 1/3;

  display: flex;
  align-items: center;
`;

const Main = styled.div`
  grid-row: 2/3;
  grid-column: 1/3;

  display: flex;
`;

const Tags = styled.div`
  grid-row: 3/4;
  grid-column: 1/2;

  display: flex;
  align-items: center;
`;

const Control = styled.div`
  grid-row: 3/4;
  grid-column: 2/3;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditArea = styled.textarea`
  resize: none;
  line-height: 1;
  font-size: 2rem;

  border: none;
  outline: none;
  box-shadow: none;
`;

const Tag = styled.div`
  border-radius: 16px;
  background: rgb(220, 220, 220);
  padding: 4px 8px;
  margin-right: 8px;
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

function TagIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 3l9 9a1.5 1.5 0 0 1 0 2l-6 6a1.5 1.5 0 0 1 -2 0l-9 -9v-4a4 4 0 0 1 4 -4h4" />
      <circle cx="9" cy="9" r="2" />
    </Svg>
  );
}
function TrashIcon() {
  return (
    <Svg
      className="icon icon-tabler icon-tabler-trash"
      height="36"
      width="36"
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
  const notes = useStoreState(state => state.selecteds);
  const [text, setText] = useState("");
  const [editNote, removeNote] = useStoreActions(actions => [
    actions.editNote,
    actions.removeNote
  ]);
  useEffect(() => {
    if (notes.length === 1) {
      setText(notes[0].body);
    }
  }, [notes]);
  if (notes.length === 0) {
    return <Wrapper>empty</Wrapper>;
  } else if (notes.length === 1) {
    return (
      <Wrapper>
        <Datetime>{humanDate(notes[0].createdAt)}</Datetime>
        <Main>
          <EditArea
            cols={34}
            rows={6}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => {
              if (e.code === "Enter") {
                editNote({ id: notes[0].id, body: e.target.value });
              }
            }}
          />
        </Main>
        <Tags>
          <Tag>仕事</Tag>
          <Tag>恋愛</Tag>
          <Tag>料理</Tag>
          <Tag>友人関係</Tag>
        </Tags>
        <Control>
          <span onClick={() => removeNote({ id: notes[0].id })}>
            <TrashIcon />
          </span>
          <TagIcon />
        </Control>
      </Wrapper>
    );
  } else {
    return <Wrapper>{notes.length} notes selected</Wrapper>;
  }
}

export default Editor;
