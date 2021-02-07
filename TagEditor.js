import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import { humanDate } from "./helper";
import ToolIcon from "./Tool";
import CloseIcon from "./CloseIcon";

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
  const [notes, ids] = useStoreState(state => [state.selecteds, state.ids]);
  const editNote = useStoreActions(actions => actions.editNote);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const renderTags = () =>
    text === ""
      ? ""
      : text.split(" ").map(tag => (
          <Tag>
            {tag}
            <CloseIcon size={21} />
          </Tag>
        ));
  const onClick = () => {
    if (open === true) {
      editNote({ id: ids[0], body: notes[0].body, tags: text.split(" ") });
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    if (notes[0].tags !== undefined && notes[0].tags.length > 0) {
      setText(notes[0].tags.reduce((acc, tag) => `${acc} ${tag}`));
    } else {
      setText("");
    }
  }, [notes]);
  return (
    <Wrapper>
      <span onClick={onClick}>
        <ToolIcon />
      </span>
      {open ? <input value={text} onChange={e => setText(e.target.value)} /> : renderTags()}
    </Wrapper>
  );
}

export default TagEditor;
