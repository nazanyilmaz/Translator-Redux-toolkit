// asenkron thunk actions

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languageOptions } from "../../constants";

export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    const res = await axios.request(languageOptions);

    //console.log(res.data.data.languages);

    return res.data.data.languages;
  }
);

//api den translate kismini istek atma
export const translateText = createAsyncThunk(
  "translate/translateText",
  async (action_params) => {
    const { sourceLang, targetLang, text } = action_params;
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "a7a023fb9cmsh146347e57f01ed2p140a35jsnaf98a40a3497",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };
    const res = await axios.request(options);

    console.log(res.data.data.translatedText);

    return res.data.data.translatedText;
  }
);
