import React from "react";
import styled from "styled-components";
import { useStoreActions } from "easy-peasy";
import Button from "./Button";
import Text from "./Text";
import NoteAdd from "./NoteAdd";
import SettingIcon from "./SettingIcon";

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
        <>
          <NoteAdd size="48" color="white" />
          <Text size="27" color="white" weight="500">
            New
          </Text>
        </>
      </Button>
      <Button type="text" onClick={() => setModal("SETTING_MODAL")}>
        <>
          <SettingIcon size="48" color="gray" />
          <Text size="27" color="gray" weight="500">
            Setting
          </Text>
        </>
      </Button>
    </Container>
  );
}

export default Control;
