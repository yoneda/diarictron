import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  background: darkorange;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 60px;
  grid-template-columns: 250px 1fr;
`;

const Notes = styled.div`
  background: linen;
  grid-row: 1/2;
  grid-column: 1/2;
`;

const Control = styled.div`
  background: white;
  grid-row: 2/3;
  grid-column: 1/2;
  border: solid 1px black;
  box-sizing: border-box;
`;

const Editor = styled.div`
  background: white;
  grid-row: 1/3;
  grid-column: 2/3;
`;

const Modal = styled.div`
  grid-row: 1/3;
  grid-column: 1/3;
  z-index: 1;
`;

Layout.Notes = Notes;
Layout.Control = Control;
Layout.Editor = Editor;
Layout.Modal = Modal;
export default Layout;
