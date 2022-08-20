import React, {
  Fragment,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "../../hooks/hooks";
import { appSelect } from "../../redux/slices/app.slice";
import { KeyType, ResultType } from "../../types";
import Key from "../Key/Key";
import s from "./Keyboard.module.scss";
import cn from "classnames";

type KeyboardProps = {
  checkHandler: (code: string) => void;
  resultCheck: ResultType;
};

const initialKeys: Array<KeyType> = [
  { en: "`", ru: "ё", key: "Backquote", inPress: false },
  { en: "1", ru: "1", key: "Digit1", inPress: false },
  { en: "2", ru: "2", key: "Digit2", inPress: false },
  { en: "3", ru: "3", key: "Digit3", inPress: false },
  { en: "4", ru: "4", key: "Digit4", inPress: false },
  { en: "5", ru: "5", key: "Digit5", inPress: false },
  { en: "6", ru: "6", key: "Digit6", inPress: false },
  { en: "7", ru: "7", key: "Digit7", inPress: false },
  { en: "8", ru: "8", key: "Digit8", inPress: false },
  { en: "9", ru: "9", key: "Digit9", inPress: false },
  { en: "0", ru: "0", key: "Digit0", inPress: false },
  { en: "-", ru: "-", key: "Minus", inPress: false },

  { en: "q", ru: "й", key: "KeyQ", inPress: false },
  { en: "w", ru: "ц", key: "KeyW", inPress: false },
  { en: "e", ru: "у", key: "KeyE", inPress: false },
  { en: "r", ru: "к", key: "KeyR", inPress: false },
  { en: "t", ru: "е", key: "KeyT", inPress: false },
  { en: "y", ru: "н", key: "KeyY", inPress: false },
  { en: "u", ru: "г", key: "KeyU", inPress: false },
  { en: "i", ru: "ш", key: "KeyI", inPress: false },
  { en: "o", ru: "щ", key: "KeyO", inPress: false },
  { en: "p", ru: "з", key: "KeyP", inPress: false },
  { en: "[", ru: "х", key: "BracketLeft", inPress: false },
  { en: "]", ru: "ъ", key: "BracketRight", inPress: false },

  { en: "a", ru: "ф", key: "KeyA", inPress: false },
  { en: "s", ru: "ы", key: "KeyS", inPress: false },
  { en: "d", ru: "в", key: "KeyD", inPress: false },
  { en: "f", ru: "а", key: "KeyF", inPress: false },
  { en: "g", ru: "п", key: "KeyG", inPress: false },
  { en: "h", ru: "р", key: "KeyH", inPress: false },
  { en: "j", ru: "о", key: "KeyJ", inPress: false },
  { en: "k", ru: "л", key: "KeyK", inPress: false },
  { en: "l", ru: "д", key: "KeyL", inPress: false },
  { en: ";", ru: "ж", key: "Semicolon", inPress: false },
  { en: "'", ru: "э", key: "Quote", inPress: false },
  { en: "|", ru: "/", key: "Backslash", inPress: false },

  { en: "z", ru: "я", key: "KeyZ", inPress: false },
  { en: "x", ru: "ч", key: "KeyX", inPress: false },
  { en: "c", ru: "с", key: "KeyC", inPress: false },
  { en: "v", ru: "м", key: "KeyV", inPress: false },
  { en: "b", ru: "и", key: "KeyB", inPress: false },
  { en: "n", ru: "т", key: "KeyN", inPress: false },
  { en: "m", ru: "ь", key: "KeyM", inPress: false },
  { en: ",", ru: "б", key: "Comma", inPress: false },
  { en: ".", ru: "ю", key: "Period", inPress: false },
  { en: "/", ru: ".", key: "Slash", inPress: false },

  { en: " ", ru: " ", key: "Space", inPress: false },
];

const Keyboard = ({ checkHandler, resultCheck }: KeyboardProps) => {
  let [keysArr, setKeys] = useState<Array<KeyType>>(initialKeys);
  const { options, inProgress } = useAppSelector(appSelect);

  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inProgress) {
      focusRef.current?.focus({ preventScroll: true });
    } else {
      focusRef.current?.blur();
    }
  }, [inProgress]);

  const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    const keyIndex = keysArr.findIndex((item) => item.key === e.code);

    if (keyIndex >= 0) {
      let newArr = [...keysArr];
      newArr[keyIndex].inPress = true;
      setKeys(newArr);
      checkHandler(e.code);
    }
  };

  const disablePress = (index: number) => {
    let newArr = [...keysArr];
    newArr[index].inPress = false;
    setKeys(newArr);
  };

  const setFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    e.target.focus({ preventScroll: true });
  };

  return (
    <div
      ref={focusRef}
      className={cn(s.wrapper, [resultCheck && s[resultCheck]])}
      onKeyDown={inProgress ? keyDownHandler : undefined}
      onBlur={inProgress ? setFocus : undefined}
      tabIndex={0}
    >
      {keysArr.map((item, index) => {
        return (
          <Fragment key={index}>
            {((index > 0 && index % 12 === 0) ||
              index === keysArr.length - 1) && <br />}
            <Key
              index={index}
              char={item[options.lang]}
              inPress={item.inPress}
              disablePress={disablePress}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default Keyboard;
