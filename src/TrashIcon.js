import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
  &:active {
    background-color: gainsboro;
  }
`;

function TrashIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      width="36"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      <line x1="4" x2="20" y1="7" y2="7" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </Svg>
  );
}

export default TrashIcon;
