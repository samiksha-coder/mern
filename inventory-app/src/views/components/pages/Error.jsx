import React from "react";
import PropTypes from "prop-types";

export default function Error(props) {
  return (
    <div>
      Error {props.status}: {props.message}
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
};
