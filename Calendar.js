import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import dayjs from "dayjs";
import { isSame } from "./helper";

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
  const [notes, numByDate] = useStoreState((state) => [
    state.notes,
    state.numByDate,
  ]);
  return (
    <Wrapper>
      <h2>calendar</h2>
      <div>
        2020年12月
        <button>&lt;</button>
        <button>&gt;</button>
      </div>
      <div>
        {[...Array(5)].map((_, row) => (
          <Row key={row}>
            {[...Array(7)].map((_, column) => {
              const m = 12 - 1;
              const d = new Date(2020, m, 1);
              const target = dayjs(d).day(column).add(row, "week");
              const num = numByDate(target);
              return <Cell active={num > 0} key={row * 7 + column} />;
            })}
          </Row>
        ))}
      </div>
    </Wrapper>
  );
}

export default Calendar;
