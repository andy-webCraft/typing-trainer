import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { appSelect, inProgressToggle } from "../../redux/slices/app.slice";
import Options from "../Options/Options";
import cn from "classnames";
import s from "./Header.module.scss";

const Header = () => {
  const { inProgress, error } = useAppSelector(appSelect);
  const dispatch = useAppDispatch();

  const inProgressHandler = () => {
    dispatch(inProgressToggle(!inProgress));
  };

  return (
    <header className={s.wrapper}>
      <h1 className={s.title}>Typing Trainer</h1>

      <button
        className={cn(s.btn, { [s.disabled]: error })}
        onClick={inProgressHandler}
      >
        {inProgress ? "Stop trainer" : "Start trainer"}
      </button>

      <Options />
    </header>
  );
};

export default Header;
