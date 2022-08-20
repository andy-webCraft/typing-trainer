import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { appSelect } from "../../redux/slices/app.slice";
import s from "./RunLine.module.scss";
import cn from "classnames";

type RunLineProps = {
  text: string;
  complete: number;
};

const RunLine = ({ text, complete }: RunLineProps) => {
  const { inProgress } = useAppSelector(appSelect);

  return (
    <div className={cn(s.wrapper, { [s.disabled]: !inProgress })}>
      <span className={s.complete}>{text.slice(0, complete)}</span>
      <span className={s.next}>{text[complete]}</span>
      <span>{text.slice(complete + 1)}</span>
    </div>
  );
};

export default RunLine;
