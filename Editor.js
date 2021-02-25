import React, { Fragment, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { humanDate } from "./helper";
import TrashIcon from "./TrashIcon";
import TagEditor from "./TagEditor";
import Button from "./Button";
import Menu from "./Menu";
import IconButton from "./IconButton";
import MoreVert from "./MoreVert";
import Info from "./Info";

const Wrapper = styled.div`
  border: 1px solid black;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;

  display: grid;
  grid-template-rows: 40px 1fr 40px;
  grid-template-columns: 1fr 40px;
`;

const CenterWrapper = styled.div`
  border: 1px solid black;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Datetime = styled.div`
  grid-row: 1/2;
  grid-column: 1/3;

  display: flex;
  align-items: center;
`;

const Main = styled.div`
  grid-row: 2/3;
  grid-column: 1/3;

  display: flex;
`;

const Control = styled.div`
  grid-row: 3/4;
  grid-column: 2/3;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditArea = styled.textarea`
  resize: none;
  line-height: 1;
  font-size: 2rem;

  border: none;
  outline: none;
  box-shadow: none;
`;

const ActionArea = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;

  display: flex;
  align-items: center;
  justify-content: center;
`;

function Editor() {
  const [notes, ids] = useStoreState(state => [state.selecteds, state.ids]);
  const [text, setText] = useState("");
  const [
    editNote,
    removeNote,
    setModal,
    setDropPoint
  ] = useStoreActions(actions => [
    actions.editNote,
    actions.removeNote,
    actions.setModal,
    actions.setDropPoint
  ]);
  useEffect(() => {
    if (notes.length === 1) {
      setText(notes[0].body);
    }
  }, [notes]);
  const measuredRef = useCallback(node => {
    console.log(node);
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      setDropPoint({ x: rect.x, y: rect.y });
    }
  }, []);
  if (notes.length === 0) {
    return <CenterWrapper>empty</CenterWrapper>;
  } else if (notes.length === 1) {
    return (
      <Wrapper>
        <Datetime>{humanDate(notes[0].createdAt)}</Datetime>
        <Main>
          <EditArea
            cols={34}
            rows={6}
            value={text}
            onInput={e => {
              if (e.nativeEvent.isComposing === false) {
                return editNote({
                  id: notes[0].id,
                  body: e.target.value,
                  tags: ""
                });
              } else {
                return setText(e.target.value);
              }
            }}
            onCompositionEnd={e =>
              editNote({
                id: notes[0].id,
                body: e.target.value,
                tags: ""
              })
            }
          />
        </Main>
        <TagEditor />
        <Control>
          {/* TODO: ここは IconButton ではなくてOutlitedButton に変更される可能性あり */}
          <IconButton
            icon={<Info />}
            onClick={() => setModal("ABOUT_DIALOG")}
            hover
          />
        </Control>
        <ActionArea>
          <div ref={measuredRef}>
            <IconButton
              icon={<MoreVert />}
              onClick={() => setModal("DROPDOWN_MENU")}
              hover
            />
          </div>
        </ActionArea>
      </Wrapper>
    );
  } else {
    return (
      <CenterWrapper>
        {notes.length} notes selected
        <span onClick={() => removeNote({ ids: ids })}>
          <TrashIcon />
        </span>
      </CenterWrapper>
    );
  }
}

export default Editor;
