import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./api";
import moment from "moment";
import { StateType } from "./interfaces";

const slice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
    lastFetchTime: 0,
  },
  reducers: {
    loadCatRequest: (cats, action) => {
      cats.loading = true;
    },
    loadCats: (cats, action) => {
      cats.list = action.payload.list;
      cats.loading = false;
      cats.lastFetchTime = Date.now();
    },
    loadCatsFailed: (cats, action) => {
      cats.loading = false;
    },
  },
});

export const { loadCatRequest, loadCats, loadCatsFailed } = slice.actions;

export default slice.reducer;

export const fetchCategories =
  () => (dispatch: any, getState: () => StateType) => {
    const { lastFetchTime } = getState().entities.categories;

    const diffInMinutes = moment().diff(moment(lastFetchTime), "minutes");
    if (diffInMinutes < 10) return;

    dispatch(
      actions.apiCallBegin({
        url: "/getWpCategories",
        method: "GET",
        onStart: loadCatRequest.type,
        onSuccess: loadCats.type,
        onError: loadCatsFailed.type,
      })
    );
  };
