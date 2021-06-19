import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.li`
  padding: 10px 20px;
  ${({ clickable }) => clickable && "cursor:pointer;"}

  display: flex;
  justify-content: space-between;
`;

function ListRow(props) {
  const { children, control, onClick, clickable } = props;
  return (
    <Container clickable={clickable} onClick={() => clickable && onClick()}>
      <div>{children}</div>
      <div>{control}</div>
    </Container>
  );
}

ListRow.propTypes = {
  children: PropTypes.element.isRequired,
  control: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  clickable: PropTypes.bool.isRequired
};

export default ListRow;
