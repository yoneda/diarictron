import styled from "styled-components";

const Layout = styled.div`
  height: 100vh;
  background-color: white;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 240px auto;
  grid-template-rows: 60px auto 80px;
`;

const TopLeft = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  background-color: white;
  box-sizing: border-box;
  border-right: 1px rgba(0, 0, 0, 0.1) solid;
  -webkit-app-region: drag;
`;

const TopRight = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  background-color: white;
  -webkit-app-region: drag;
`;

const Notes = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
  background-color: white;
  box-sizing: border-box;
  border-right: 1px rgba(0, 0, 0, 0.1) solid;
`;

const ButtonBar = styled.div`
  grid-column: 1/2;
  grid-row: 3/4;
  background-color: white;
  box-sizing: border-box;
  border-top: 1px rgba(0, 0, 0, 0.1) solid;
  border-right: 1px rgba(0, 0, 0, 0.1) solid;
`;

const Editor = styled.div`
  grid-column: 2/3;
  grid-row: 2/4;
  background-color: white;
`;

const FullView = styled.div`
  grid-column: 1/3;
  grid-row: 1/4;
  z-index: 1;
`;

Layout.TopLeft = TopLeft;
Layout.TopRight = TopRight;
Layout.Notes = Notes;
Layout.ButtonBar = ButtonBar;
Layout.Editor = Editor;
Layout.FullView = FullView;
export default Layout;
