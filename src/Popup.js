import React, { useRef } from "react";
import styled from "styled-components";
import { isInside } from "./helper";
import PropTypes from "prop-types";

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: ${props => props.y || 0}px auto 1fr;
  grid-template-columns: ${props => props.x || 0}px auto 1fr;
`;

const Item = styled.div`
  background: white;
  grid-row: 2/3;
  grid-column: 2/3;

  display: flex;
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

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  left: PropTypes.number,
  top: PropTypes.number
};

export default Popup;
