import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { textAPI } from "../api/text.api";
import appReducer from "./slices/app.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [textAPI.reducerPath]: textAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(textAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
