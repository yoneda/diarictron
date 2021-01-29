import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  background: darkorange;
  height: 100vh;
  display: grid;
  grid-template-rows: 250px 1fr 60px;
  grid-template-columns: 250px 8px 1fr;
`;

const Calendar = styled.div`
  background: lightyellow;
  grid-row: 1/2;
  grid-column: 1/2;
`;

const Notes = styled.div`
  background: linen;
  grid-row: ${props => (props.theme.showCal ? 1 : 2)} / 3;
  grid-column: 1/2;
`;

const Control = styled.div`
  background: white;
  grid-row: 3/4;
  grid-column: 1/2;
  border: solid 1px black;
  box-sizing: border-box;
`;

const Line = styled.div`
  background: chocolate;
  cursor: col-resize;
  grid-row: 1/4;
  grid-column: 2/3;
`;

const Editor = styled.div`
  background: white;
  grid-row: 1/4;
  grid-column: 3/4;
`;

const Modal = styled.div`
  grid-row: 1/4;
  grid-column: 1/4;
  z-index: 1;
`;

Layout.Calendar = Calendar;
Layout.Notes = Notes;
Layout.Control = Control;
Layout.Line = Line;
Layout.Editor = Editor;
Layout.Modal = Modal;
export default Layout;
