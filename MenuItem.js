import React from "react";
import styled from "styled-components";

const Container = styled.li`
  cursor: pointer;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

function MenuItem(props) {
  const { children, onClick } = props;
  return <Container onClick={() => onClick()}>{children}</Container>;
}

export default MenuItem;
