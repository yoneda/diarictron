import React, { useRef } from "react";
import styled from "styled-components";
import { isInside } from "./helper";
import PropTypes from "prop-types";

const Container = styled.div`
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
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

const TitleBar = styled.div`
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const Content = styled.div`
  padding: 8px 24px;
  display: flex;
  justify-content: center;
`;

const ActionBar = styled.div`
  height: 60px;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
`;

function useRange(onInside, onOutside) {
  const ref = useRef(null);
  function onClick({ x, y }) {
    const rect = ref.current.getBoundingClientRect();
    if (isInside({ x, y }, rect)) {
      onInside && onInside();
    } else {
      onOutside && onOutside();
    }
  }
  return [ref, onClick];
}

function Dialog(props) {
  const { title, close, children, buttons, onClose } = props;
  const [ref, onClick] = useRange(null, onClose);

  return (
    <Container
      onMouseDown={event => onClick({ x: event.clientX, y: event.clientY })}
    >
      <Wrapper ref={ref}>
        {(title || close) && (
          <TitleBar>
            {title && title}
            {close && close}
          </TitleBar>
        )}
        <Content>{children}</Content>
        {buttons && <ActionBar>{buttons}</ActionBar>}
      </Wrapper>
    </Container>
  );
}

Dialog.propTypes = {
  title: PropTypes.element,
  close: PropTypes.element,
  children: PropTypes.element.isRequired,
  buttons: PropTypes.element,
  onClose: PropTypes.func.isRequired
};

export default Dialog;
