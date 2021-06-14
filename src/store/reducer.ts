import { combineReducers } from "redux";
import products from "./products";
import categories from "./categories";
import cart from "./cart";

const reducer = combineReducers({
  entities: combineReducers({
    products,
    categories,
    cart,
  }),
});

export default reducer;
