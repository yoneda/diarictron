import React from "react";
import styled, { css } from "styled-components";
import Cancel from "./Cancel";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  border-radius: 16px;
  padding: 0 8px;
  background-color: #dedede;
  color: rgba(0, 0, 0, 0.87);

  ${({ type }) => {
    if (type === "outlined") {
      return css`
        border: 1px solid #dedede;
        background-color: white;
      `;
    } else {
      return css`
        border: none;
        background-color: #dedede;
      `;
    }
  }}
`;

function Chip(props) {
  const { type, children, onClose } = props;
  return (
    <Wrapper type={type} onClick={() => onClick()}>
      {children}
      <div onClick={() => onClose()}>
        <Cancel />
      </div>
    </Wrapper>
  );
}

export default Chip;
