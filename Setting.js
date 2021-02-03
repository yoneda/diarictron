import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Wrapper = styled.div`
  width: 500px;
  height: 300px;
  border: 1px solid black;
  box-sizing: border-box;

  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 80px 1fr 120px;
`;

const Icon = styled.div`
  border-radius: 4px;
  padding: 4px;
  margin-right: 10px;

  display: flex;
  align-items: center;

  &:hover {
    background: rgb(240, 240, 240);
    cursor: pointer;
  }
  &:active {
    background: rgb(220, 220, 220);
  }
`;

const H2 = styled.h2`
  grid-row: 1/2;
  grid-column: 2/3;

  display: flex;
  align-items: center;
`;

const Close = styled.div`
  grid-row: 1/2;
  grid-column: 3/4;

  display: flex;
  align-items: center;
`;

const Body = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
`;

const FontSelect = styled.select`
  width: 100%;
`;

const ExportButton = styled.button`
  width: 100%;
`;

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="rotate(45 12 12)">
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </g>
    </svg>
  );
}

function Setting(props) {
  const { onClose } = props;
  const user = useStoreState(state => state.user);
  const updateUser = useStoreActions(actions => actions.updateUser);
  return (
    <Wrapper>
      <H2>設定</H2>
      <Close>
        <Icon onClick={() => onClose()}>
          <CloseIcon />
          閉じる
        </Icon>
      </Close>
      <Body>
        <p>スタイル</p>
        <div>
          <input type="radio" id="normal" />
          <label for="normal">通常</label>
        </div>
        <div>
          <input type="radio" id="dayone" />
          <label for="dayone">Day One</label>
        </div>
        <br />
        <label htmlFor="fontSize">フォントサイズ</label>
        <br />
        <FontSelect
          id="fontSize"
          onChange={e => updateUser({ fontSize: e.target.value })}
          value={user.fontSize}
        >
          <option value="small">小</option>
          <option value="midium">中</option>
          <option value="large">大</option>
        </FontSelect>
        <br />
        <br />
        <ExportButton>エクスポートノート</ExportButton>
        <br />
      </Body>
    </Wrapper>
  );
}

export default Setting;
