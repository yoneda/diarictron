import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  margin-left: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(150,150,150,0.5);
  }
  &:active {
    background-color: rgba(150,150,150,0.8);
  }
`;

function CloseIcon(props) {
  const { size } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
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
    </Svg>
  );
}

export default CloseIcon;