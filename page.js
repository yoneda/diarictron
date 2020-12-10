import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

function Page() {
  return <div>hello, landing page.</div>
}

ReactDOM.render(<Page />, document.getElementById("page"));
