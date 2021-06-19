import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  border-radius: 4px;
  background-color: white;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0px;
  margin-block-start: 0.5rem;
  margin-block-end: 0.5rem;
`;

function Menu(props) {
  const { children } = props;
  return (
    <Container>
      <MenuList>{children}</MenuList>
    </Container>
  );
}

Menu.propTypes = {
  children: PropTypes.element.isRequired
};

export default Menu;
