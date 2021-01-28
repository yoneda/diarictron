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

const Note = styled.div`
  background: ${props => (props.light ? "lightgreen" : "white")};
  height: 100px;
  border-bottom: 1px solid rgb(200, 200, 200);
  box-sizing: border-box;
  padding: 20px;
`;

function NoteList() {
  const [notes, ids, recentId] = useStoreState(state => [
    state.notes,
    state.ids,
    state.recentId
  ]);
  const [touch, append, drag] = useStoreActions(actions => [
    actions.touch,
    actions.append,
    actions.drag
  ]);
  return (
    <Wrapper>
      {notes.map((note, key) => (
        <Note
          key={key}
          onClick={event => {
            if (event.metaKey) {
              return append({ id: note.id });
            } else if (event.shiftKey) {
              return drag({ start: recentId, end: note.id });
            } else {
              return touch({ id: note.id });
            }
          }}
          light={ids.some(id => note.id === id)}
        >
          <span>{note.body}</span>
        </Note>
      ))}
    </Wrapper>
  );
}

export default NoteList;
