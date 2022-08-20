import React, { useEffect, useRef, useState } from "react";
import { useGetTextQuery } from "../../api/text.api";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { appSelect, errorToggle } from "../../redux/slices/app.slice";
import Keyboard from "../Keyboard/Keyboard";
import RunLine from "../RunLine/RunLine";
import s from "./Trainer.module.scss";
import cn from "classnames";
import Info from "../Info/Info";
import { checkKeyByCode } from "../../tools/checkKeybyCode";
import { ResultType, TimerRefType } from "../../types";
import GameField from "../GameField/GameField";

const Trainer = () => {
  let [text, setText] = useState<string>("");
  let [complete, setComplete] = useState<number>(0);
  let [resultCheck, setResultCheck] = useState<ResultType>(null);

  const { options, inProgress } = useAppSelector(appSelect);
  const dispatch = useAppDispatch();

  const { data, isFetching, isError, refetch } = useGetTextQuery(options.lang, {
    refetchOnMountOrArgChange: true,
  });

  let timerId: TimerRefType = useRef(null);

  useEffect(() => {
    if (inProgress && data) {
      Array.isArray(data) ? setText(data.join("")) : setText(data.text);
    } else {
      setComplete(0);
    }
  }, [inProgress, data]);

  useEffect(() => {
    isError ? dispatch(errorToggle(true)) : dispatch(errorToggle(false));
  }, [isError]);

  useEffect(() => {
    if (resultCheck != null) {
      clearTimeout(timerId.current!);
      timerId.current = setTimeout(() => setResultCheck(null), 400);
    }
  }, [resultCheck]);

  const checkKey = (code: string) => {
    const check = checkKeyByCode(code, text[complete]);
    if (check) {
      setComplete((complete) => complete + 1);
      setResultCheck("success");
      if (complete === text.length - 1) {
        setComplete(0);
        refetch();
      }
    } else setResultCheck("failed");
  };

  return (
    <div className={cn(s.wrapper, [resultCheck && s[resultCheck]])}>
      <Info complete={complete} />

      {options.mode === "godzillaAttack" && (
        <GameField resultCheck={resultCheck} />
      )}

      {isError && (
        <p className={s.error}>&#128542; Oops... something went wrong...</p>
      )}

      {isFetching ? (
        <p className={s.loader}>...Loading...</p>
      ) : (
        <RunLine text={text} complete={complete} />
      )}

      <Keyboard checkHandler={checkKey} resultCheck={resultCheck} />
    </div>
  );
};

export default Trainer;
