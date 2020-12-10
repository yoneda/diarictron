import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

function Pencil() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-pencil"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#2c3e50"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
      <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
    </svg>
  );
}

const Logo = styled.div`
  display: frex;
  flex-flow: row wrap;
  align-items: center;
`;

function Page() {
  return (
    <div id="container">
      <Logo>
        <Pencil />
        <h2>簡単日記</h2>
      </Logo>
      <button onClick={()=>{}}>ダウンロード</button>
    </div>
  );
}

ReactDOM.render(<Page />, document.getElementById("page"));
