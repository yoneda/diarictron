import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  border: solid 1px black;
  box-sizing: border-box;
`;

function Calendar() {
  return (
    <Wrapper>
      <h2>calendar</h2>
      <div>header</div>
      <div>table</div>
    </Wrapper>
  );
}

export default Calendar;
