import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Wrapper = styled.div`
  width: 200px;
  height: 80px;
  border: solid 1px black;
  box-sizing: border-box;
`;

function Setting() {
  // TODO: 設定項目について lowdb および easypeasy と繋ぎこむ
  return (
    <Wrapper>
      <div>
        <input type="checkbox" id="dark" />
        <label htmlFor="dark">ダークモード</label>
      </div>
      <div>
        <input type="checkbox" id="showCal" />
        <label htmlFor="showCal">カレンダー表示</label>
      </div>
      <div>
        <select id="startDay">
          <option value="Monday">Monday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <label htmlFor="startDay">週のはじまり</label>
      </div>
    </Wrapper>
  );
}

export default Setting;
