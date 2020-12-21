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

function Main() {
  const count = useStoreState((state) => state.count);
  const addCount = useStoreActions((actions) => actions.addCount);
  return (
    <Fragment>
      <div>count: {count}</div>
      <button onClick={() => addCount()}>add</button>
    </Fragment>
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
