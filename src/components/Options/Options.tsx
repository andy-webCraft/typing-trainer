import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  appSelect,
  langToggle,
  modeToggle,
} from "../../redux/slices/app.slice";
import { LangType, ModeType } from "../../types";
import s from "./Options.module.scss";
import cn from "classnames";

const Options = () => {
  const { options, inProgress } = useAppSelector(appSelect);
  const dispatch = useAppDispatch();

  let [lang, langChange] = useState<LangType>(options.lang);
  let [mode, modeChange] = useState<ModeType>(options.mode);

  const changeLang = (e: ChangeEvent<HTMLInputElement>) => {
    const option = e.currentTarget.value;
    if (option === "ru" || option === "en") {
      langChange(option);
      dispatch(langToggle(option));
    }
  };

  const changeMode = (e: ChangeEvent<HTMLInputElement>) => {
    const option = e.currentTarget.value;
    if (option === "godzillaAttack" || option === "freeMode") {
      modeChange(option);
      dispatch(modeToggle(option));
    }
  };

  return (
    <div className={cn(s.wrapper, { [s.disabled]: inProgress })}>
      <div className={s.item}>
        <p className={s.title}>Select language:</p>

        <div className={s.option}>
          <input
            type="radio"
            name="lang"
            value="ru"
            defaultChecked={lang === "ru"}
            onChange={changeLang}
          />
          <label>ru</label>
        </div>

        <div className={s.option}>
          <input
            type="radio"
            name="lang"
            value="en"
            defaultChecked={lang === "en"}
            onChange={changeLang}
          />
          <label>en</label>
        </div>
      </div>

      <div className={s.item}>
        <p className={s.title}>Select mode:</p>

        <div className={s.option}>
          <input
            type="radio"
            name="mode"
            value="godzillaAttack"
            defaultChecked={mode === "godzillaAttack"}
            onChange={changeMode}
          />
          <label>godzilla attack</label>
        </div>

        <div className={s.option}>
          <input
            type="radio"
            name="mode"
            value="freeMode"
            defaultChecked={mode === "freeMode"}
            onChange={changeMode}
          />
          <label>free mode</label>
        </div>
      </div>
    </div>
  );
};

export default Options;
