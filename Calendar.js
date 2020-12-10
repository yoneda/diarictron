import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Wrapper = styled.div`
  width: 200px;
  height: 50px;
  border: solid 1px black;
  box-sizing: border-box;
`;

function Calendar() {
  return (
    <Wrapper>
      calendar
    </Wrapper>
  );
}

export default Calendar;