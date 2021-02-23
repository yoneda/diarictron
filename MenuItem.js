import React from "react";
import styled from "styled-components";

const Container = styled.li`
  cursor: pointer;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

function MenuItem(props) {
  const { children } = props;
  return <Container>{children}</Container>;
}

export default MenuItem;