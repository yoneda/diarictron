import React, { Fragment, useEffect, useRef } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import dayjs from "dayjs";
import { hasLabel } from "./helper";

const CardBox = styled.div`
  width: 40px;
  background-color: lightyellow;
  flex-grow: 
  flex: 0 1 auto;
`;

function Card(props) {
  const { date } = props;
  return (
    <CardBox>
      <div>{dayjs(date).format("ddd")}</div>
      <div>{dayjs(date).format("D")}</div>
    </CardBox>
  );
}

const MetaBox = styled.div`
  width: 40px;
  background-color: salmon;
  flex: 0 1 auto;
`;

function Meta(props) {
  const { date } = props;
  return <MetaBox>{dayjs(date).format("H:m")}</MetaBox>;
}

const TextBox = styled.div`
  background-color: azure;
  flex: 1 1 auto;
`;

function Text(props) {
  const { text } = props;
  return <TextBox>{text}</TextBox>;
}

const MonthLabelBox = styled.div`
  height: 20px;
  background-color: lavender;
`;

function MonthLabel(props) {
  const { date } = props;
  return <MonthLabelBox>{dayjs(date).format("YYYY年MM月")}</MonthLabelBox>;
}

const NoteRow = styled.div`
  display: flex;
  height: 60px;
`;

const Container = styled.div`
  width: 200px;
`;

function NoteList() {
  const options = {
    showCard: true,
    showMeta: true,
    showMonth: true
  };
  const [notes, ids, creation, user] = useStoreState(state => [
    state.notes,
    state.ids,
    state.creation,
    state.user
  ]);

  return (
    <Container>
      {notes.map((note, key, array) => (
        <>
          {options.showMonth && hasLabel(array,key) && <MonthLabel date={note.createdAt} />}
          <NoteRow>
            {options.showCard && <Card date={note.createdAt} />}
            <Text text={note.body} />
            {options.showMeta && <Meta date={note.createdAt} />}
          </NoteRow>
        </>
      ))}
    </Container>
  );
}

export default NoteList;
