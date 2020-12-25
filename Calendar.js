import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  border: solid 1px black;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Cell = styled.div`
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: solid ${(props) => (props.none ? "0px" : "1px")} black;
  background: ${(props) => (props.active ? "darkorange" : "white")};
`;

function Calendar() {
  return (
    <Wrapper>
      <h2>calendar</h2>
      <div>
        2020年12月
        <button>&lt;</button>
        <button>&gt;</button>
      </div>
      <div>
        <Row>
          <Cell none />
          <Cell none />
          <Cell clear />
          <Cell active />
          <Cell active />
          <Cell />
          <Cell active />
        </Row>
      </div>
    </Wrapper>
  );
}

export default Calendar;
