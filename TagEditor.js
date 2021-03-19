import React, { useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import Chip from "./Chip";

// TODO:
// 分割されたコンポーネントがGridLayoutの子要素になっているのは少し読みづらい気がするので後で修正
const Wrapper = styled.div`
  grid-row: 3/4;
  grid-column: 1/2;

  display: flex;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  font-size: 18px;
`;

function TagEditor() {
  const notes = useStoreState(state => state.selecteds);
  const editNote = useStoreActions(actions => actions.editNote);
  const [text, setText] = useState("");
  return (
    <Wrapper>
      {notes[0].tags !== undefined &&
        notes[0].tags.length > 0 &&
        notes[0].tags.map((tag, key) => (
          <Chip
            type="normal"
            key={key}
            onClose={() =>
              editNote({
                id: notes[0].id,
                body: notes[0].body,
                tags: notes[0].tags.filter((_, index) => key !== index)
              })
            }
          >
            {tag}
          </Chip>
        ))}
      <Input
        type="text"
        value={text}
        placeholder="Add a tag…"
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.code === "Enter") {
            editNote({
              id: notes[0].id,
              body: notes[0].body,
              tags:
                notes[0].tags === undefined
                  ? [e.target.value]
                  : [...notes[0].tags, e.target.value]
            });
            setText("");
          }
        }}
      />
    </Wrapper>
  );
}

export default TagEditor;
