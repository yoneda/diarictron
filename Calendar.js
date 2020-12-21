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
  border: solid 1px black;
  box-sizing: border-box;
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
          <div>月</div>
          <div>火</div>
          <div>水</div>
          <div>木</div>
          <div>金</div>
          <div>土</div>
          <div>日</div>
        </Row>
        <Row>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </Row>
        <Row>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </Row>
        <Row>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </Row>
        <Row>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </Row>
        <Row>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </Row>
      </div>
    </Wrapper>
  );
}

export default Calendar;
