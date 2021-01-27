import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Wrapper = styled.div`
  border: solid 1px black;
  box-sizing: border-box;
  overflow: scroll;
`;

const Note = styled.div`
  background: ${props => (props.light ? "lightgreen" : "white")};
  height: 100px;
  border-bottom: 1px solid rgb(200, 200, 200);
  box-sizing: border-box;
  padding: 20px;
`;

function NoteList() {
  const [notes, id] = useStoreState(state => [state.notes, state.id]);
  const tapNote = useStoreActions(actions => actions.tapNote);
  return (
    <Wrapper>
      {notes.map((note, key) => (
        <Note
          key={key}
          onClick={() => tapNote({ id: note.id })}
          light={note.id === id}
        >
          <span>{note.body}</span>
        </Note>
      ))}
    </Wrapper>
  );
}

export default NoteList;
