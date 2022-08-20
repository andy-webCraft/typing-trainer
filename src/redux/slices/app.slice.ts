import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppState, LangType, ModeType } from "../../types";
import { RootState } from "../store";

const initialState: IAppState = {
  options: {
    lang: "en",
    mode: "freeMode",
  },
  inProgress: false,
  maxScore: { godzillaAttack: 0, freeMode: 0 },
  error: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    langToggle(state, action: PayloadAction<LangType>) {
      state.options.lang = action.payload;
    },
    modeToggle(state, action: PayloadAction<ModeType>) {
      state.options.mode = action.payload;
    },
    inProgressToggle(state, action: PayloadAction<boolean>) {
      state.inProgress = action.payload;
    },
    getMaxScore(state) {
      const userMaxScore = JSON.parse(localStorage.getItem("maxScore") || "");
      if (userMaxScore) state.maxScore = userMaxScore;
    },
    setMaxScore(state, action: PayloadAction<number>) {
      state.maxScore[state.options.mode] = action.payload;
      localStorage.setItem("maxScore", JSON.stringify(state.maxScore));
    },
    errorToggle(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
  },
});

export const {
  inProgressToggle,
  langToggle,
  modeToggle,
  getMaxScore,
  setMaxScore,
  errorToggle,
} = appSlice.actions;

export const appSelect = (state: RootState) => state.app;

export default appSlice.reducer;
