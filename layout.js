import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  background: darkorange;
  height: 100vh;
  display: grid;
  grid-template-rows: 250px 1fr 50px;
  grid-template-columns: 250px 8px 1fr;
`;

const Calendar = styled.div`
  background: violet;
  grid-row: 1/2;
  grid-column: 1/2;
`;

const Notes = styled.div`
  background: linen;
  grid-row: 2/3;
  grid-column: 1/2;
`;

const Control = styled.div`
  background: turquoise;
  grid-row: 3/4;
  grid-column: 1/2;
`;

const Line = styled.div`
  background: chocolate;
  cursor: col-resize;
  grid-row: 1/4;
  grid-column: 2/3;
`;

const Editor = styled.div`
  background: whitesmoke;
  grid-row: 1/4;
  grid-column: 3/4;
`;

Layout.Calendar = Calendar;
Layout.Notes = Notes;
Layout.Control = Control;
Layout.Line = Line;
Layout.Editor = Editor;
export default Layout;
