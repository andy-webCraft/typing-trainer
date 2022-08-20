import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EnTextResponse, LangType, RuTextResponse } from "../types";

export const textAPI = createApi({
  reducerPath: "textReducer",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getText: builder.query<RuTextResponse | EnTextResponse, LangType>({
      query: (lang) => {
        return lang === "en"
          ? "https://baconipsum.com/api/?type=all-meat&paras=1&format=json"
          : "https://fish-text.ru/get";
      },
    }),
  }),
});

export const { useGetTextQuery } = textAPI;
