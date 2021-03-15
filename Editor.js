import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import TagEditor from "./TagEditor";
import IconButton from "./IconButton";
import MoreVert from "./MoreVert";
import Info from "./Info";
import dayjs from "dayjs";
import marked from "marked";

const Wrapper = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 20px;

  display: grid;
  grid-template-rows: 40px 1fr 40px;
  grid-template-columns: 1fr 40px;
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

const PreviewArea = styled.div``;

const ActionArea = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;

  display: flex;
  align-items: center;
  justify-content: center;
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
  const note = useStoreState(state => state.targetNote);
  const [editNote, setModal] = useStoreActions(actions => [
    actions.editNote,
    actions.setModal
  ]);
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(true);
  useEffect(() => {
    setText(note.body);
  }, [note]);
  const dropDownRef = useDropDown();
  return (
    <Wrapper>
      <Datetime>
        {dayjs(note.createdAt).format("YYYY年MM月DD日(ddd) H:m")}
      </Datetime>
      <Main>
        {preview ? (
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
        ) : (
          <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
        )}
      </Main>
      <TagEditor />
      <Control>
        {/* TODO: ここは IconButton ではなくてOutlitedButton に変更される可能性あり */}
        <IconButton icon={<Info />} onClick={() => setModal("ABOUT_DIALOG")} />
      </Control>
      <ActionArea>
        {
          <div ref={dropDownRef}>
            <IconButton
              icon={<MoreVert />}
              onClick={() => setModal("DROPDOWN_MENU")}
            />
          </div>
        }
      </ActionArea>
    </Wrapper>
  );
}

export default Editor;
