import React, { useState } from "react";
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
  const [target, setTarget] = useState(dayjs().format("YYYY-MM-DD"));
  const [notes, numByDate] = useStoreState((state) => [
    state.notes,
    state.numByDate,
  ]);
  return (
    <Wrapper>
      <h2>calendar</h2>
      <div>
        <button
          onClick={() =>
            setTarget(dayjs(target).subtract(1, "month").format("YYYY-MM-DD"))
          }
        >
          &lt;
        </button>
        <button
          onClick={() =>
            setTarget(dayjs(target).add(1, "month").format("YYYY-MM-DD"))
          }
        >
          &gt;
        </button>
        {`${dayjs(target).year()}年${dayjs(target).month() + 1}月`}
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
