import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import { humanDate } from "./helper";
import ToolIcon from "./Tool";
import Cancel from "./Cancel";

// TODO:
// 分割されたコンポーネントがGridLayoutの子要素になっているのは少し読みづらい気がするので後で修正
const Wrapper = styled.div`
  grid-row: 3/4;
  grid-column: 1/2;

  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  border-radius: 16px;
  background: rgb(220, 220, 220);
  padding: 8px 12px;
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
          <Tag>
            {tag}
            <span
              onClick={() => {
                editNote({
                  id: notes[0].id,
                  body: notes[0].body,
                  tags: notes[0].tags.filter((_, index) => key !== index)
                });
              }}
            >
              <Cancel />
            </span>
          </Tag>
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
                notes[0].tags === undefined ? [e.target.value] : [...notes[0].tags, e.target.value]
            });
            setText("");
          }
        }}
      />
    </Wrapper>
  );
}

export default TagEditor;
