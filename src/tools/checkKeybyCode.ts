const keysCode: { [key: string]: string } = {
  Backquote: "`~ёЁ",
  Digit1: "1!",
  Digit2: `2@"`,
  Digit3: "3#№",
  Digit4: "4$;",
  Digit5: "5%",
  Digit6: "6^:",
  Digit7: "7&?",
  Digit8: "8*",
  Digit9: "9(",
  Digit0: "0)",
  Minus: "-_",
  Equal: "=+",

  KeyQ: "qQйЙ",
  KeyW: "wWцЦ",
  KeyE: "eEуУ",
  KeyR: "rRкК",
  KeyT: "tTЕе",
  KeyY: "yYнН",
  KeyU: "uUгГ",
  KeyI: "iIшШ",
  KeyO: "oOщЩ",
  KeyP: "pPзЗ",
  BracketLeft: "[{хХ",
  BracketRight: "]}ъЪ",

  KeyA: "aAфФ",
  KeyS: "sSыЫ",
  KeyD: "dDвВ",
  KeyF: "fFаА",
  KeyG: "gGпП",
  KeyH: "hHрР",
  KeyJ: "jJоО",
  KeyK: "kKлЛ",
  KeyL: "lLдД",
  Semicolon: ";:жЖ",
  Quote: `'"эЭ`,
  Backslash: "|/",

  KeyZ: "zZяЯ",
  KeyX: "xXчЧ",
  KeyC: "cCсС",
  KeyV: "vVмМ",
  KeyB: "bBиИ",
  KeyN: "nNтТ",
  KeyM: "mMьЬ",
  Comma: ",<бБ",
  Period: ".>юЮ",
  Slash: "/?.,",
  Space: " ",
};

export const checkKeyByCode = (code: string, char: string): boolean => {
  return keysCode[code].includes(char);
};
