import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import {
  action,
  createStore,
  StoreProvider,
  useStoreState,
  useStoreActions,
} from "easy-peasy";

const store = createStore({
  count: 0,
  addCount: action((state, payload) => {
    state.count++;
  }),
});

const GlobalStyle = createGlobalStyle`
  body{
    font-size: 15px;
  }
`;

const Flex = styled.div`
  display: flex;
  height: 100vh;
  flex-flow: row wrap;
`;

const Left = styled.div`
  background: salmon;
  flex: 0 0 220px;
`;

const Right = styled.div`
  background: skyblue;
  flex: 1 0 auto;
`;

function Main() {
  const count = useStoreState((state) => state.count);
  const addCount = useStoreActions((actions) => actions.addCount);
  return (
    <Flex>
      <Left>left</Left>
      <Right>right</Right>
    </Flex>
  );
}

function App() {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <StoreProvider store={store}>
        <Reset />
        <GlobalStyle />
        <Main />
      </StoreProvider>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
