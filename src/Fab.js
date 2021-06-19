import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  border-radius: 4px;
  padding: 10px 14px;
  margin: 8px;
  outline: none;
  box-sizing: border-box;
  font-size: 20px;
  cursor: pointer;

  ${({ type, primary, onPrimary }) => {
    if (type === "outlined") {
      return css`
        border: 2px solid ${primary};
        background-color: rgba(0, 0, 0, 0);
        color: ${primary};
        font-weight: 400;
        &:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
      `;
    } else if (type === "contained") {
      return css`
        border: 2px solid ${primary};
        background-color: ${primary};
        color: ${onPrimary};
        font-weight: 500;
        &:hover {
          box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
            0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
        }
      `;
    }
  }}

  display: flex;
  align-items: center;
`;

function Fab(props) {
  const { type, primary, onPrimary, onClick, children } = props;
  return (
    <Container {...{ type, primary, onPrimary }} onClick={() => onClick()}>
      {children}
    </Container>
  );
}

Fab.propTypes = {
  type: PropTypes.oneOf(["outlined", "contained"]).isRequired,
  primary: PropTypes.string.isRequired,
  onPrimary: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired
};

export default Fab;
