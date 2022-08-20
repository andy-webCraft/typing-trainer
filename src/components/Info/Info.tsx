import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  appSelect,
  getMaxScore,
  setMaxScore,
} from "../../redux/slices/app.slice";
import Timer from "../Timer/Timer";
import s from "./Info.module.scss";

type InfoProps = {
  complete: number;
};

const Info = ({ complete }: InfoProps) => {
  const { inProgress, options, maxScore } = useAppSelector(appSelect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMaxScore());
  }, []);

  useEffect(() => {
    if (!inProgress && maxScore[options.mode] < complete) {
      dispatch(setMaxScore(complete));
    }
  }, [inProgress]);

  return (
    <div className={s.wrapper}>
      <span>Complete: {complete}</span>
      <Timer />
      <span>Max Score: {maxScore[options.mode]}</span>
    </div>
  );
};

export default Info;
