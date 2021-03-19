import React from "react";
import styled from "styled-components";
import { useStoreActions } from "easy-peasy";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  flow-flow: row nowrap;
`;

function Control() {
  const [addNote, setModal] = useStoreActions(actions => [
    actions.addNote,
    actions.setModal
  ]);
  return (
    <Container>
      <Button type="contained" onClick={() => addNote({ body: "new" })}>
        NEW
      </Button>
      <Button type="text" onClick={() => setModal("SETTING_MODAL")}>
        SETTING
      </Button>
    </Container>
  );
}

export default Control;
