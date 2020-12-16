import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Wrapper = styled.div`
  width: 200px;
  height: 50px;
  border: solid 1px black;
  box-sizing: border-box;
`;

function Setting() {
  return (
    <Wrapper>
      <div>
        <input type="checkbox" id="dark" />
        <label for="dark">ダークモード</label>
      </div>
      <div>
        <input type="checkbox" id="showCal" />
        <label for="showCal">カレンダー表示</label>
      </div>
    </Wrapper>
  );
}

export default Setting;
