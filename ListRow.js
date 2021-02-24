import React from "react";
import styled from "styled-components";

const Container = styled.li`
  cursor: pointer;
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
`;

function ListRow(props) {
  const { children, control, onClick } = props;
  return (
    <Container onClick={() => onClick && onClick()}>
      <div>{children}</div>
      <div>{control}</div>
    </Container>
  );
}

export default ListRow;
