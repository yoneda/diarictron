import React, { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  /* background: darkorange; */
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 1fr 200px 1fr;
  grid-template-columns: 1fr 400px 1fr;
`;

const Item = styled.div`
  background: skyblue;
  grid-row: 2/3;
  grid-column: 2/3;
`;

function Modal(props) {
  const { onClose } = props;
  const ref = useRef(null);
  return (
    <Container
      onMouseDown={(event) => {
        // TODO: isInside メソッドは helper.js に移動する予定
        const isInside = (point, rect) =>
          point.x > rect.x &&
          point.x <= rect.x + rect.width &&
          point.y > rect.y &&
          point.y <= rect.y + rect.height;
        if (
          !isInside(
            { x: event.clientX, y: event.clientY },
            ref.current.getBoundingClientRect()
          )
        ) {
          onClose();
        }
      }}
    >
      <Item ref={ref}>item</Item>
    </Container>
  );
}

export default Modal;
