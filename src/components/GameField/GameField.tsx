import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { appSelect, inProgressToggle } from "../../redux/slices/app.slice";
import { ResultType, TimerRefType } from "../../types";
import s from "./GameField.module.scss";
import cn from "classnames";
import godzillaImg from "../../assets/img/godzilla-img.png";
import catImg from "../../assets/img/running-cat-img.png";

type GameFieldProps = {
  resultCheck: ResultType;
};

const GameField = ({ resultCheck }: GameFieldProps) => {
  let [timerCount, setTimerCount] = useState<number>(0);
  let [playerPos, setPlayerPos] = useState<number>(40);

  const dispatch = useAppDispatch();
  const { inProgress } = useAppSelector(appSelect);

  let timerId: TimerRefType = useRef(null);

  useEffect(() => {
    if (inProgress) {
      setTimerCount(1);
    } else {
      clearTimeout(timerId.current!);
      setTimerCount(0);
      setPlayerPos(40);
    }
  }, [inProgress]);

  useEffect(() => {
    if (timerCount > 0) {
      if (playerPos < 3) dispatch(inProgressToggle(false));
      else {
        timerId.current = setTimeout(() => {
          playerCheckAndStep(playerPos, "backward");
          setTimerCount((timerCount) => timerCount + 1);
        }, 800);
      }
    }
  }, [timerCount]);

  useEffect(() => {
    if (resultCheck != null) {
      const direction = resultCheck === "success" ? "forward" : "backward";
      playerCheckAndStep(playerPos, direction);
    }
  }, [resultCheck]);

  const playerCheckAndStep = (
    playerPos: number,
    direction: "forward" | "backward"
  ) => {
    if (direction === "forward" && playerPos < 87) {
      setPlayerPos((playerPos) => playerPos + 3);
    } else if (direction === "backward" && playerPos >= 3)
      setPlayerPos((playerPos) => playerPos - 3);
  };

  return (
    <div className={cn(s.wrapper, { [s.running]: inProgress })}>
      <div className={s.track}>
        <div className={s.lines}>
          <div className={s.lines__first}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={s.lines__second}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={s.godzilla}>
          <img src={godzillaImg} alt="godzilla-img" />
        </div>
        <div className={s.player} style={{ left: playerPos + "%" }}>
          <img src={catImg} alt="cat-img" />
        </div>
      </div>
    </div>
  );
};

export default GameField;
