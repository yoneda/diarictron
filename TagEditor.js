import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import { humanDate } from "./helper";
import ToolIcon from "./Tool";

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
  padding: 4px 8px;
  margin-right: 8px;
`;

function TagEditor() {
  const [open, isOpen] = useState(false);
  const [text, setText] = useState("仕事 恋愛 料理 友人関係");
  const renderTags = () => text.split(" ").map(tag => <Tag>{tag}</Tag>);
  return (
    <Wrapper>
      <span onClick={() => isOpen(!open)}>
        <ToolIcon />
      </span>
      {open ? <input value={text} onChange={e => setText(e.target.value)} /> : renderTags()}
    </Wrapper>
  );
}

export default TagEditor;
