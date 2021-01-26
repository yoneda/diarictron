import React, { useRef } from "react";
import styled from "styled-components";
import { isInside } from "./helper";

const Container = styled.div`
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-rows: 1fr 300px 1fr;
  grid-template-columns: 1fr 500px 1fr;
`;

const Item = styled.div`
  background: white;
  grid-row: 2/3;
  grid-column: 2/3;
`;

function Modal(props) {
  const { onClose, children } = props;
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
      <Item ref={ref}>{children}</Item>
    </Container>
  );
}

export default Modal;
