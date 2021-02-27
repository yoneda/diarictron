import React, { Fragment, useEffect, useRef } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import dayjs from "dayjs";

const Wrapper = styled.div`
  box-sizing: border-box;
  overflow: scroll;
  height: calc(99.9vh - 140px);
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
  width: ${props => (props.isMin ? "130px" : `${130 + 60}px`)};
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
  const { onClick, onContextMenu, light, isCard, date, children } = props;
  const showDay = () => {
    switch (dayjs(date).get("day")) {
      case 0:
        return "日";
      case 1:
        return "月";
      case 2:
        return "火";
      case 3:
        return "水";
      case 4:
        return "木";
      case 5:
        return "金";
      case 6:
        return "土";
    }
  };
  return (
    <NoteWrapper
      light={light}
      onClick={event => onClick(event)}
      onContextMenu={event => onContextMenu(event)}
    >
      {isCard && (
        <Card>
          <div>{showDay()}</div>
          <div>{dayjs(date).get("date")}</div>
        </Card>
      )}
      <Text isMin={isCard}>{children}</Text>
    </NoteWrapper>
  );
}

function NoteList() {
  const ref = useRef(null);
  const [notes, ids, creation, user] = useStoreState(state => [
    state.notes,
    state.ids,
    state.creation,
    state.user
  ]);
  const [touch, append, grep, setModal, setContextPoint] = useStoreActions(actions => [
    actions.touch,
    actions.append,
    actions.grep,
    actions.setModal,
    actions.setContextPoint
  ]);

  useEffect(() => {
    ref.current.scrollTo(0, 0);
  }, [creation]);
  return (
    <Wrapper ref={ref}>
      {notes.map((note, key, array) => (
        <Fragment>
          {user.uiStyle === "dayone" && key === 0 && (
            <MonthLabel onClick={() => grep({ date: note.createdAt })}>
              {dayjs(note.createdAt).format("YYYY年MM月")}
            </MonthLabel>
          )}
          {user.uiStyle === "dayone" &&
            key > 0 &&
            dayjs(array[key - 1].createdAt).isAfter(dayjs(array[key].createdAt), "month") && (
              <MonthLabel onClick={() => grep({ date: note.createdAt })}>
                {dayjs(note.createdAt).format("YYYY年MM月")}
              </MonthLabel>
            )}
          <Note
            isCard={
              (user.uiStyle === "dayone" &&
                key > 0 &&
                dayjs(array[key - 1].createdAt).isAfter(dayjs(array[key].createdAt), "day")) ||
              (user.uiStyle === "dayone" && key === 0)
            }
            date={note.createdAt}
            key={key}
            onClick={event => (event.metaKey ? append({ id: note.id }) : touch({ id: note.id }))}
            onContextMenu={event => {
              setModal("CONTEXT_MODAL");
              touch({ id: note.id });
              setContextPoint({ x: event.clientX, y: event.clientY });
            }}
            light={ids.some(id => note.id === id)}
          >
            {note.body}
          </Note>
        </Fragment>
      ))}
    </Wrapper>
  );
}

export default NoteList;
