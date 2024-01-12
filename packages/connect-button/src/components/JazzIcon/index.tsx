import React, { useEffect, useRef } from "react";
// @ts-ignore
import jazzicon from "@metamask/jazzicon";

// #ts-ignore
const JazzIcon = ({ diameter, className, publicAddress }: any) => {
  const ref = useRef();

  useEffect(() => {
    const icon = jazzicon(diameter, publicAddress);

    if (ref.current) {
      // @ts-ignore
      ref.current.innerHTML = "";
      // @ts-ignore
      ref.current.appendChild(icon);
    }
  }, [diameter]);

  return <div className={className} ref={ref as any} />;
};

export default JazzIcon;
