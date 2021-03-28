import React from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import Logo from "./Logo";
import Link from "./Link";
import Fab from "./Fab";

const Container = styled.div`
  height: 100vh;
  background-color: dodgerblue;
  color: white;
  font-family: 'Roboto', sans-serif;

  display: flex;
  flex-flow: column nowrap;
`;

const Footer = styled.footer`
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
  display: flex;
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
          <Fab type="outlined" primary="white" onClick={() => navigate("/app")}>
            Live Demo
          </Fab>
          <Fab
            type="contained"
            primary="white"
            onPrimary="dodgerblue"
            onClick={() => navigate("/app")}
          >
            Download for Mac
          </Fab>
        </Actions>
      </Main>
      <Footer>
        <Link path="https://google.com" color="white">
          ソースコード
        </Link>
        <Link path="https://google.com" color="white">
          利用規約
        </Link>
        <Link path="https://google.com" color="white">
          プライバシーポリシー
        </Link>
      </Footer>
    </Container>
  );
}

export default Top;
