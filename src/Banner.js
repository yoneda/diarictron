import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  height: 100px;
  background-color: ${({ color }) => (color ? color : "lightgray")};
  color: white;

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
`;

function Banner(props) {
  const { color, children, close } = props;
  return (
    <Container color={color}>
      {children}
      {close}
    </Container>
  );
}

Banner.propTypes = {
  color: PropTypes.string,
  children: PropTypes.element.isRequired,
  close: PropTypes.element.isRequired
};

export default Banner;
