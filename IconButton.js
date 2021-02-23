import React from "react";
import styled from "styled-components";

const Container = styled.button`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  outline: none;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
  &:hover{
    background-color: rgba(0, 0, 0, 0.05);
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

function IconButton(props) {
  const { icon, onClick } = props;
  return <Container onClick={() => onClick()}>{icon}</Container>;
}

export default IconButton;
