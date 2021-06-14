import axios from "axios";

import * as actions from "../api";

const api = (store: any) => (next: any) => async (action: any) => {
  if (action.type !== actions.apiCallBegin.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;
  if (onStart) store.dispatch({ type: onStart });
  next(action);
  try {
    const response = await axios.request({
      baseURL: "http://localhost:8080/",
      url,
      data,
      method,
    });
    store.dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess)
      store.dispatch({ type: onSuccess, payload: { list: response.data } });
    //store.dispatch({type:"success", payload:{message: "success"}});
  } catch (error) {
    store.dispatch(actions.apiCallFailure(error.message));
    if (onError) store.dispatch({ type: onError, payload: error.message });
  }
};
export default api;
