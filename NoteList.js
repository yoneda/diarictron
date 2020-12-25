import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  border: solid 1px black;
  box-sizing: border-box;
  overflow: scroll;
`;

const Note = styled.div`
  cursor: pointer;
  background: ${(props) => (props.light ? "whitesmoke" : "white")};
`;

function NoteList() {
  const [notes, id] = useStoreState((state) => [state.notes, state.id]);
  const tapNote = useStoreActions((actions) => actions.tapNote);
  return (
    <Wrapper>
      {notes.map((note, key) => (
        <Note
          key={key}
          onClick={() => tapNote({ id: note.id })}
          light={note.id === id}
        >
          {note.body}
        </Note>
      ))}
    </Wrapper>
  );
}

export default NoteList;
