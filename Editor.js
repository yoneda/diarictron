import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import TagEditor from "./TagEditor";
import IconButton from "./IconButton";
import Batu from "./Batu";
import MoreVert from "./MoreVert";
import Info from "./Info";
import dayjs from "dayjs";
import marked from "marked";
import Text from "./Text";
import Button from "./Button";

// TODO: GridLayoutをコンポーネント化する
const Container = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 60px;

  display: grid;
  grid-template-rows: 50px 1fr 100px;
  grid-template-columns: 50px 1fr 200px;
`;

const LeftControl = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  display: flex;
  align-items: center;
`;

const RightControl = styled.div`
  grid-row: 1/2;
  grid-column: 3/4;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const RightBottomControl = styled.div`
  grid-row: 3/4;
  grid-column: 3/4;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Datetime = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;
  display: flex;
  align-items: center;
`;

const Main = styled.div`
  grid-row: 2/3;
  grid-column: 1/4;

  display: flex;
`;

const EditArea = styled.textarea`
  resize: none;
  line-height: 1;
  font-size: 2rem;

  border: none;
  outline: none;
  box-shadow: none;
`;

function useDropDown() {
  const setMenuRect = useStoreActions(actions => actions.setMenuRect);
  const ref = useRef(null);
  function handle() {
    const rect = ref.current.getBoundingClientRect();
    setMenuRect({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    });
  }
  useEffect(() => {
    window.addEventListener("resize", handle);
    handle();
    return () => window.removeEventListener("resize", handle);
  }, [ref.current]);
  return ref;
}

function Editor() {
  const [note, preview] = useStoreState(state => [
    state.targetNote,
    state.preview
  ]);
  const [editNote, setModal, detouch] = useStoreActions(actions => [
    actions.editNote,
    actions.setModal,
    actions.detouch
  ]);
  const [text, setText] = useState("");
  useEffect(() => {
    setText(note.body);
  }, [note]);
  const dropDownRef = useDropDown();
  return (
    <Container>
      <LeftControl>
        <IconButton
          icon={<Batu size={24} />}
          onClick={() => detouch(note.id)}
        ></IconButton>
      </LeftControl>
      <Datetime>
        {dayjs(note.createdAt).format("YYYY年MM月DD日(ddd) H:m")}
      </Datetime>
      <Main>
        {preview ? (
          <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
        ) : (
          <EditArea
            cols={34}
            rows={6}
            value={text}
            onInput={e => {
              if (e.nativeEvent.isComposing === false) {
                return editNote({
                  id: note.id,
                  body: e.target.value,
                  tags: note.tags
                });
              } else {
                return setText(e.target.value);
              }
            }}
            onCompositionEnd={e =>
              editNote({
                id: note.id,
                body: e.target.value,
                tags: note.tags
              })
            }
          />
        )}
      </Main>
      <TagEditor />
      <RightBottomControl>
        <Button type="text" onClick={() => setModal("ABOUT_DIALOG")}>
          <>
            <Info size="48" color="gray" />
            <Text size="27" color="gray" weight="500">
              Info
            </Text>
          </>
        </Button>
      </RightBottomControl>
      <RightControl>
        {
          <div ref={dropDownRef}>
            <IconButton
              icon={<MoreVert />}
              onClick={() => setModal("DROPDOWN_MENU")}
            />
          </div>
        }
      </RightControl>
    </Container>
  );
}

export default Editor;
