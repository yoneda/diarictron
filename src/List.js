import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.ul`
  list-style: none;
  padding: 0px;
  margin-block-start: 0.6rem;
  margin-block-end: 0.6rem;
  background-color: white;
  width: 400px;
`;

function List(props) {
  const { children } = props;
  return <Container>{children}</Container>;
}

List.propTypes = {
  children: PropTypes.element
};

export default List;
