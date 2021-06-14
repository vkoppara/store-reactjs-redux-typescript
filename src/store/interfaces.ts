import reducer from "./reducer";
export interface Category {
  catId: number;
  name: string;
}

export interface CartItem {
  itemId: number;
  cartCount: number;
  cardTitle: string;
  price: number;
}

export interface ProductItem {
  itemId: number;
  cardTitle: string;
  price: number;
  catId: number;
  imgLink: string;
}

export interface Post {
  transactionId: number;
  responseMessage: string;
}

export interface AddToCartItem {
  itemId: number;
  item: CartItem;
}

export interface CheckoutType {
  cartItems: CartItem[];
  fullTotalAmount: number;
}

export interface CartList {
  list: {
    cartItems: CartItem[];
    fullTotalAmount: number;
    cartCount: number;
    post: Post;
  };
  loading: boolean;
}
export interface ProductList {
  list: ProductItem[];
  loading: boolean;
  lastFetchTime: number;
}

export interface CategoryList {
  list: Category[];
  loading: boolean;
  lastFetchTime: number;
}

/*export interface StateType {
  entities: { cart: CartList; products: ProductList; category: CategoryList };
}*/

export type StateType = ReturnType<typeof reducer>;
