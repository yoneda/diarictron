import React, { Fragment, useEffect, useState, useRef } from "react";
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
import * as color from "./color";
import dayjs from "dayjs";

const Wrapper = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 20px;

  display: grid;
  grid-template-rows: 40px 1fr 40px;
  grid-template-columns: 1fr 40px;
`;

const CenterWrapper = styled.div`
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
  const [notes, ids, length] = useStoreState(state => [state.selecteds, state.ids, state.length]);
  const [text, setText] = useState("");
  const [
    editNote,
    removeNote,
    setModal,
    setMenuRect
  ] = useStoreActions(actions => [
    actions.editNote,
    actions.removeNote,
    actions.setModal,
    actions.setMenuRect
  ]);
  const ref = useRef(null);
  useEffect(() => {
    if (length === 1) {
      setText(notes[0].body);
    }
  }, [notes]);
  useEffect(() => {
    if (length === 1) {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMenuRect({
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        });
      }
    }
  }, [ref.current]);
  useEffect(() => {
    function handle() {
      const rect = ref.current.getBoundingClientRect();
      setMenuRect({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      });
    }
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [ref.current]);
  if (length === 0) {
    return <CenterWrapper>empty</CenterWrapper>;
  } else if (length === 1) {
    return (
      <Wrapper>
        <Datetime>
          {dayjs(notes[0].createdAt).format("YYYY年MM月DD日(ddd) H:m")}
        </Datetime>
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
          />
        </Control>
        <ActionArea>
          <div ref={ref}>
            <IconButton
              icon={<MoreVert />}
              onClick={() => setModal("DROPDOWN_MENU")}
            />
          </div>
        </ActionArea>
      </Wrapper>
    );
  } else {
    return (
      <CenterWrapper>
        {length} notes selected
        <Button
          type="outlined"
          color={color.RED_500}
          onClick={() => removeNote({ ids: ids })}
        >
          DELETE
        </Button>
      </CenterWrapper>
    );
  }
}

export default Editor;
