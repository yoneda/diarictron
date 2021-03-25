import React, { Fragment, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import Button from "./Button";
import Acunit from "./Acunit";
import styled from "styled-components";
import Logo from "./Logo";

const Container = styled.div`
  height: 100vh;
  background-color: dodgerblue;
  color: white;

  display: flex;
  flex-flow: column nowrap;
`;

const Footer = styled.footer`
  font-size: 20px;
  flex: 0 1 auto;
  padding: 10px;

  display: flex;
  justify-content: center;
`;

const Main = styled.main`
  font-size: 48px;
  flex: 1 1 auto;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const H2 = styled.h2`
  font-weight: bold;
`;

function Top() {
  return (
    <Container>
      <Main>
        <H2>
          <Logo color="white" size={48} />
          Diarictron
        </H2>
        <p>毎日を記録しよう✋</p>
        <ul>
          <li>✓ダークモード</li>
          <li>✓キーボードショートカット</li>
          <li>✓マークダウン対応</li>
          <li>✓オープンソース</li>
        </ul>
        <Button type="outlined" onClick={() => navigate("/app")}>
          VIEW DEMO
        </Button>
        <Button type="outlined" onClick={() => navigate("/app")}>
          DOWNLOAD
        </Button>
      </Main>
      <Footer>
        <div>ソースコード | 利用規約 | プライバシーポリシー</div>
      </Footer>
    </Container>
  );
}

export default Top;
