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

function TagIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 3l9 9a1.5 1.5 0 0 1 0 2l-6 6a1.5 1.5 0 0 1 -2 0l-9 -9v-4a4 4 0 0 1 4 -4h4" />
      <circle cx="9" cy="9" r="2" />
    </Svg>
  );
}

export default TagIcon;
