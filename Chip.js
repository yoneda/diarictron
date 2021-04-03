import React from "react";
import styled, { css } from "styled-components";
import Cancel from "./Cancel";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 24px;
  padding: 14px;
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
    <Wrapper type={type}>
      {children}
      <div onClick={() => onClose()}>
        <Cancel />
      </div>
    </Wrapper>
  );
}

Chip.propTypes = {
  type: PropTypes.oneOf(["normal", "outlined"]).isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Chip;
