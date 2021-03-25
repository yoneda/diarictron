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

const Title = styled.div`
  margin-bottom: 40px;

  display: flex;
`;

const Description = styled.div`
  margin-bottom: 40px;
`;

const Actions = styled.div`
`;

const H2 = styled.h2`
  font-size: 48px;
  font-weight: 700;
  margin-left: 10px;
`;

const P = styled.p`
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Ul = styled.ul`
  line-height: 34px;
`;

const Li = styled.li`
  font-size: 28px;
  font-weight: 500;
`;

function Top() {
  return (
    <Container>
      <Main>
        <Title>
          <Logo color="white" size={48} />
          <H2>Diarictron</H2>
        </Title>
        <Description>
          <P>毎日を記録しよう✋</P>
          <Ul>
            <Li>✓ダークモード</Li>
            <Li>✓キーボードショートカット</Li>
            <Li>✓マークダウン対応</Li>
            <Li>✓オープンソース</Li>
          </Ul>
        </Description>
        <Actions>
          <Button type="outlined" onClick={() => navigate("/app")}>
            VIEW DEMO
          </Button>
          <Button type="outlined" onClick={() => navigate("/app")}>
            DOWNLOAD
          </Button>
        </Actions>
      </Main>
      <Footer>
        <div>ソースコード | 利用規約 | プライバシーポリシー</div>
      </Footer>
    </Container>
  );
}

export default Top;
