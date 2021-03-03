import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.button`
  border-radius: 4px;
  padding: 10px 14px;
  margin: 8px;
  outline: none;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;

  ${({ type, color }) => {
    if (type === "outlined") {
      return css`
        border: 1px solid ${color ? color : "dodgerblue"};
        background-color: white;
        color: ${color ? color : "dodgerblue"};
        &:hover {
          background-color: rgba(0, 0, 0, 0.02);
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
        border: none;
        background-color: white;
        color: ${color ? color : "dodgerblue"};
        &:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
      `;
    }
  }}

  display: flex;
  align-items: center;
`;

function Button(props) {
  const { type, color, children, onClick } = props;
  return (
    <Wrapper type={type} onClick={() => onClick()} color={color}>
      {children}
    </Wrapper>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["outlined", "contained", "text"]).isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  color: PropTypes.string
};

export default Button;
