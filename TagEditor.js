import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import { humanDate } from "./helper";
import ToolIcon from "./Tool";
import Cancel from "./Cancel";
import Chip from "./Chip";

// TODO:
// 分割されたコンポーネントがGridLayoutの子要素になっているのは少し読みづらい気がするので後で修正
const Wrapper = styled.div`
  grid-row: 3/4;
  grid-column: 1/2;

  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  height: 32px;
  border-radius: 16px;
  padding: 0 8px;
  background-color: #dedede;
  color: rgba(0, 0, 0, 0.87);
  margin-right: 8px;

  display: flex;
  align-items: center;
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
      <input
        type="text"
        value={text}
        placeholder="タグを追加…"
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
