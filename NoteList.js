import React, { Fragment } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import dayjs from "dayjs";
import { hasLabel } from "./helper";
import PropTypes from "prop-types";
import Text from "./Text";

const CardContainer = styled.div`
  width: 90px;
  flex: 0 1 auto;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const CardBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  border: 1px solid black;
`;

function Card(props) {
  const { date } = props;
  return (
    <CardContainer>
      <CardBox>
        <div>{dayjs(date).format("ddd")}</div>
        <div>{dayjs(date).format("D")}</div>
      </CardBox>
    </CardContainer>
  );
}

Card.propTypes = {
  date: PropTypes.string.isRequired
};

const Meta = styled.div`
  width: 90px;
  flex: 0 1 auto;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const MonthLabel = styled.div`
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const NoteRow = styled.div`
  display: flex;
  height: 110px;
  background-color: ${({ selected }) =>
    selected ? "rgba(100,100,100,0.3)" : "white"};
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
`;

const Container = styled.div`
  height: calc(100vh - ${({ theme }) => (theme.showBanner ? 200 : 100)}px);
  overflow: scroll;
`;

const Body = styled.div`
  width: 220px;
  flex: 1 1 auto;
  flex-flow: row nowrap;
  overflow: hidden;
`;

function NoteList() {
  const [notes, ids, user] = useStoreState(state => [
    state.notes,
    state.ids,
    state.user
  ]);
  const [
    touch,
    append,
    grep,
    setModal,
    setContextPoint
  ] = useStoreActions(actions => [
    actions.touch,
    actions.append,
    actions.grep,
    actions.setModal,
    actions.setContextPoint
  ]);
  const options = {
    showCard: user.uiStyle === "dayone",
    showMeta: user.uiStyle === "dayone",
    showMonth: user.uiStyle === "dayone"
  };

  const getMonth = date => dayjs(date).format("YYYY年MM月");
  const getTime = date => dayjs(date).format("H:m");
  const onRowClick = (event, id) =>
    event.metaKey ? append({ id }) : touch({ id });
  const onRightClick = (event, id) => {
    event.preventDefault();
    setModal("CONTEXT_MODAL");
    touch({ id });
    setContextPoint({ x: event.clientX, y: event.clientY });
  };

  return (
    <Container>
      {notes.map((note, key, array) => (
        <Fragment key={key}>
          {options.showMonth && hasLabel(array, key) && (
            <MonthLabel onClick={() => grep({ date: note.createdAt })}>
              {
                <Text size="20" weight="400" color="black">
                  {getMonth(note.createdAt)}
                </Text>
              }
            </MonthLabel>
          )}
          <NoteRow
            selected={ids.includes(note.id)}
            onClick={event => onRowClick(event, note.id)}
            onContextMenu={event => onRightClick(event, note.id)}
          >
            {options.showCard && <Card date={note.createdAt} />}
            <Body>{note.body}</Body>
            {options.showMeta && <Meta>{getTime(note.createdAt)}</Meta>}
          </NoteRow>
        </Fragment>
      ))}
    </Container>
  );
}

export default NoteList;
