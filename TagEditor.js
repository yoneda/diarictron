import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import { humanDate } from "./helper";

// TODO:
// 分割されたコンポーネントがGridLayoutの子要素になっているのは少し読みづらい気がするので後で修正
const Tags = styled.div`
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
  return (
    <Tags>
      <Tag>仕事</Tag>
      <Tag>恋愛</Tag>
      <Tag>料理</Tag>
      <Tag>友人関係</Tag>
    </Tags>
  );
}

export default TagEditor;
