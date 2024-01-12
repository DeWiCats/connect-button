import React, { useEffect, useRef } from "react";
import jazzicon from "@metamask/jazzicon";
import PropTypes from "prop-types";

const JazzIcon = ({ diameter, className, publicAddress }) => {
  const ref = useRef();

  useEffect(() => {
    const icon = jazzicon(diameter, publicAddress);

    if (ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(icon);
    }
  }, [diameter]);

  return <div className={className} ref={ref} />;
};

JazzIcon.propTypes = {
  diameter: PropTypes.number.isRequired,
  className: PropTypes.string,
  publicAddress: PropTypes.string.isRequired,
};

export default JazzIcon;
