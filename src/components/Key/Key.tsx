import React, { useEffect } from "react";
import s from "./Key.module.scss";
import cn from "classnames";

type keyProps = {
  index: number;
  char: string;
  inPress: boolean;
  disablePress: (index: number) => void;
};

const Key = ({ index, char, inPress, disablePress }: keyProps) => {
  useEffect(() => {
    if (inPress) setTimeout(() => disablePress(index), 200);
  }, [inPress, index, disablePress]);

  return <div className={cn(s.wrapper, { [s.press]: inPress })}>{char}</div>;
};

export default Key;
