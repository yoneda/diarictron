import React, { useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import Chip from "./Chip";

// TODO:
// 分割されたコンポーネントがGridLayoutの子要素になっているのは少し読みづらい気がするので後で修正
const Wrapper = styled.div`
  grid-row: 3/4;
  grid-column: 1/3;

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
  const note = useStoreState(state => state.targetNote);
  const editNote = useStoreActions(actions => actions.editNote);
  const [text, setText] = useState("");
  return (
    <Wrapper>
      {note.tags !== undefined &&
        note.tags.length > 0 &&
        note.tags.map((tag, key) => (
          <Chip
            type="normal"
            key={key}
            onClose={() =>
              editNote({
                id: note.id,
                body: note.body,
                tags: note.tags.filter((_, index) => key !== index)
              })
            }
          >
            {tag}
          </Chip>
        ))}
      <Input
        type="text"
        value={text}
        placeholder="タグを入力…"
        onChange={e => setText(e.target.value)}
        onInput={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.code === "Enter" && e.nativeEvent.isComposing===false) {
            editNote({
              id: note.id,
              body: note.body,
              tags:
                note.tags === undefined
                  ? [e.target.value]
                  : [...note.tags, e.target.value]
            });
            setText("");
          }
        }}
      />
    </Wrapper>
  );
}

export default TagEditor;
