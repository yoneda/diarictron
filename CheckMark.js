import React from "react";
import PropTypes from "prop-types";

function CheckMark(props) {
  const { size, color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </svg>
  );
}

CheckMark.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
};

export default CheckMark;
