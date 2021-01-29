import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { appendFile } from "fs";

const Wrapper = styled.div`
  border: solid 1px black;
  box-sizing: border-box;
  overflow: scroll;
  height: 500px;
  background: aliceblue;
`;

const Note = styled.div`
  background: ${props => (props.light ? "lightgreen" : "white")};
  height: 100px;
  border-bottom: 1px solid rgb(200, 200, 200);
  box-sizing: border-box;
  padding: 20px;
  overflow: hidden;
`;

function NoteList() {
  const [notes, ids] = useStoreState(state => [state.notes, state.ids]);
  const [touch, append] = useStoreActions(actions => [
    actions.touch,
    actions.append
  ]);
  return (
    <Wrapper>
      {notes.map((note, key) => (
        <Note
          key={key}
          onClick={event =>
            event.metaKey ? append({ id: note.id }) : touch({ id: note.id })
          }
          light={ids.some(id => note.id === id)}
        >
          <span>{note.body}</span>
        </Note>
      ))}
    </Wrapper>
  );
}

export default NoteList;
