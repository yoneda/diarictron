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
        border: 1px solid dodgerblue;
        background-color: white;
        color: dodgerblue;
        &:hover {
          background-color: rgba(30, 144, 255, 0.05);
        }
      `;
    } else if (type === "contained") {
      return css`
        border: none;
        background-color: dodgerblue;
        color: white;
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
          0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        &:hover {
          background-color: rgb(21, 111, 198);
        }
      `;
    } else {
      return css`
      `;
    }
  }}
`;

function Chip(props) {
  const { type, children, onClose } = props;
  return (
    <Wrapper type={type} onClick={() => onClick()}>
      {children}
      <div onClick={()=>onClose()}><Cancel /></div>
    </Wrapper>
  );
}

export default Chip;
