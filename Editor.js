import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import { humanDate } from "./helper";
import TrashIcon from "./TrashIcon";
import TagIcon from "./TagIcon";

const Wrapper = styled.div`
  border: 1px solid black;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;

  display: grid;
  grid-template-rows: 40px 1fr 40px;
  grid-template-columns: 1fr 80px;
`;

const CenterWrapper = styled.div`
  border: 1px solid black;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
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

function Editor() {
  const [notes, ids] = useStoreState(state => [state.selecteds, state.ids]);
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
    return <CenterWrapper>empty</CenterWrapper>;
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
          <span onClick={() => removeNote({ ids: ids })}>
            <TrashIcon />
          </span>
          <TagIcon />
        </Control>
      </Wrapper>
    );
  } else {
    return (
      <CenterWrapper>
        {notes.length} notes selected
        <span onClick={() => removeNote({ ids: ids })}>
          <TrashIcon />
        </span>
      </CenterWrapper>
    );
  }
}

export default Editor;
