import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { isInside } from "./helper";

const Container = styled.div`
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr 600px 1fr;
`;

const Wrapper = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;

  border-radius: 4px;
  background-color: white;
  width: 600px;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
`;

const Title = styled.div`
  padding: 16px 24px;
`;

const Content = styled.div`
  padding: 8px 24px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
`;

function Dialog(props) {
  const { title, children, actions, onClose } = props;
  const ref = useRef(null);
  return (
    <Container
      onMouseDown={event => {
        const rect = ref.current.getBoundingClientRect();
        if (!isInside({ x: event.clientX, y: event.clientY }, rect)) {
          onClose();
        }
      }}
    >
      <Wrapper ref={ref}>
        <Title>{title}</Title>
        <Content>{children}</Content>
        <Actions>{actions}</Actions>
      </Wrapper>
    </Container>
  );
}

export default Dialog;
