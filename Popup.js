import React, { useRef } from "react";
import styled from "styled-components";
import { isInside } from "./helper";

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: ${props => props.y || 0}px 50px 1fr;
  grid-template-columns: ${props => props.x || 0}px 50px 1fr;
`;

const Item = styled.div`
  background: white;
  grid-row: 2/3;
  grid-column: 2/3;

  border: 1px black solid;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Popup(props) {
  const { onClose, children, left, top } = props;
  const ref = useRef(null);
  return (
    <Container
      x={left}
      y={top}
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

export default Popup;
