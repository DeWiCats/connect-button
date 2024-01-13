import React, { ElementRef, useEffect, useRef } from "react";
import jazzicon from "@metamask/jazzicon";

type JazzIconProps = {
  diameter: number;
  className: string;
  publicAddress: string;
};

const JazzIcon = ({ diameter, className, publicAddress }: JazzIconProps) => {
  const ref = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const icon = jazzicon(diameter, publicAddress);

    if (ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(icon);
    }
  }, [diameter]);

  return <div className={className} ref={ref} />;
};

export default JazzIcon;
