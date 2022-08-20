import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { appSelect, inProgressToggle } from "../../redux/slices/app.slice";
import s from "./Timer.module.scss";

const Timer = () => {
  let [minute, setMinute] = useState<number>(0);
  let [second, setSecond] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { inProgress } = useAppSelector(appSelect);

  useEffect(() => {
    if (inProgress) {
      setTimeout(() => tick(second, minute), 1000);
    } else {
      setMinute(0);
      setSecond(0);
    }
  }, [inProgress, minute, second]);

  const tick = (second: number, minute: number) => {
    if (minute === 60) {
      dispatch(inProgressToggle(false));
      alert("It's probably worth taking a break... ))");
    } else if (second === 59) {
      setMinute((minute) => minute + 1);
      setSecond(0);
    } else {
      setSecond((second) => second + 1);
    }
  };

  return (
    <div className={s.wrapper}>
      <span>{minute < 10 ? "0" + minute : minute}</span> :{" "}
      <span>{second < 10 ? "0" + second : second}</span>
    </div>
  );
};

export default Timer;
