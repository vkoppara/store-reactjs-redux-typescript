import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./api";
import moment from "moment";
import { StateType } from "./interfaces";

const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    lastFetchTime: 0,
  },
  reducers: {
    loadProductsRequest: (products, action) => {
      products.loading = true;
    },
    loadProducts: (products, action) => {
      products.list = action.payload.list;
      products.loading = false;
      products.lastFetchTime = Date.now();
    },
    loadProductsFailed: (products, action) => {
      products.loading = false;
    },
  },
});

export const { loadProductsRequest, loadProducts, loadProductsFailed } =
  slice.actions;

export default slice.reducer;

export const fetchProducts =
  () => (dispatch: any, getState: () => StateType) => {
    const { lastFetchTime } = getState().entities.products;

    const diffInMinutes = moment().diff(moment(lastFetchTime), "minutes");
    if (diffInMinutes < 10) return;

    dispatch(
      actions.apiCallBegin({
        url: "/getWpItems",
        method: "GET",
        onStart: loadProductsRequest.type,
        onSuccess: loadProducts.type,
        onError: loadProductsFailed.type,
      })
    );
  };
