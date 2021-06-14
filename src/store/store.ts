import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import api from "./middleware/api";
import toast from "./middleware/toast";

const store = () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger, toast, api],
  });
};

export default store;
