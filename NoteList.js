import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Wrapper = styled.div`
  border: solid 1px black;
  box-sizing: border-box;
  overflow: scroll;
  height: 500px;
  background: aliceblue;
`;

const NoteWrapper = styled.div`
  height: 100px;
  background: ${props => (props.light ? "lightgreen" : "white")};
  border-bottom: 1px solid rgb(200, 200, 200);
  box-sizing: border-box;
  padding: 20px 20px 20px 0px;
  overflow: hidden;

  display: flex;
`;

const Card = styled.div`
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid black;
  margin-left: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  margin-left: 20px;
  box-sizing: border-box;
`;

const MonthLabel = styled.div`
  background: white;
  height: 40px;
  border-bottom: 1px solid rgb(200, 200, 200);
  box-sizing: border-box;
  padding-left: 20px;

  display: flex;
  align-items: center;
`;

function Note(props) {
  const { onClick, light, isCard, children } = props;
  return (
    <NoteWrapper light={light} onClick={event => onClick(event)}>
      {isCard && (
        <Card>
          <div>月</div>
          <div>28</div>
        </Card>
      )}
      <Text>{children}</Text>
    </NoteWrapper>
  );
}

function NoteList() {
  const [notes, ids] = useStoreState(state => [state.notes, state.ids]);
  const [touch, append] = useStoreActions(actions => [
    actions.touch,
    actions.append
  ]);
  return (
    <Wrapper>
      <MonthLabel>2021年1月</MonthLabel>
      {notes.map((note, key) => (
        <Note
          isCard={true}
          key={key}
          onClick={event =>
            event.metaKey ? append({ id: note.id }) : touch({ id: note.id })
          }
          light={ids.some(id => note.id === id)}
        >
          {note.body}
        </Note>
      ))}
    </Wrapper>
  );
}

export default NoteList;
