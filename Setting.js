import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Wrapper = styled.div`
  width: 250px;
  height: 120px;
  border: solid 1px black;
  box-sizing: border-box;
`;

function Setting() {
  const user = useStoreState(state => state.user);
  const updateUser = useStoreActions(actions => actions.updateUser);
  return (
    <Wrapper>
      <h2>Setting</h2>
      <div>
        <input
          type="checkbox"
          id="dark"
          checked={user.dark}
          onChange={e => updateUser({ dark: e.target.checked })}
        />
        <label htmlFor="dark">ダークモード</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="showCal"
          checked={user.showCal}
          onChange={e => updateUser({ showCal: e.target.checked })}
        />
        <label htmlFor="showCal">カレンダー表示</label>
      </div>
      <div>
        <select
          id="startDay"
          onChange={e => updateUser({ start: e.target.value })}
          value={user.start}
        >
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
          <option value="monday">Monday</option>
        </select>
        <label htmlFor="startDay">週のはじまり</label>
      </div>
    </Wrapper>
  );
}

export default Setting;
