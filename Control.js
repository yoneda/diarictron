import React from "react";
import styled from "styled-components";
import { useStoreActions } from "easy-peasy";

const Container = styled.div`
  display: flex;
  flow-flow: row nowrap;
`;

const Clickable = styled.div`
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
  &:active {
    background-color: gainsboro;
  }
`;

function Settings() {
  return (
    <svg
      className="icon icon-tabler icon-tabler-settings"
      height="50"
      width="50"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function Plus() {
  return (
    <svg
      className="icon icon-tabler icon-tabler-plus"
      height="50"
      width="50"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

function Control() {
  const [addNote, setModal] = useStoreActions(actions => [
    actions.addNote,
    actions.setModal
  ]);
  return (
    <Container>
      <Clickable onClick={() => setModal("SETTING_MODAL")}>
        <Settings />
      </Clickable>
      <Clickable onClick={() => addNote({ body: "new" })}>
        <Plus />
      </Clickable>
    </Container>
  );
}

export default Control;
