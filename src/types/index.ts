export type LangType = "ru" | "en";

export type ModeType = "godzillaAttack" | "freeMode";

export type KeyType = { en: string; ru: string; key: string; inPress: boolean };

export type ResultType = "success" | "failed" | null;

export interface IOptions {
  lang: LangType;
  mode: ModeType;
}

export interface IAppState {
  options: IOptions;
  inProgress: boolean;
  maxScore: { godzillaAttack: number; freeMode: number };
  error: boolean;
}

export type RuTextResponse = {
  status: string;
  text: string;
};

export type EnTextResponse = Array<string>;

export type TimerRefType = {
  current: NodeJS.Timeout | null;
};
