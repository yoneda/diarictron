import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const A = styled.a`
  font-size: 18px;
  color: ${props => (props.color ? props.color : "black")};
  text-decoration: none;
  margin-right: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

function Link(props) {
  const { path, color, children } = props;
  return (
    <A target="__blank" href={path} color={color}>
      {children}
    </A>
  );
}

Link.propTypes = {
  children: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default Link;
