import React, { Component, Dispatch } from "react";
import CheckoutResponse from "./checkoutResponse";
import { connect } from "react-redux";
import {
  checkoutCart,
  decreaseItemCount,
  addToCart,
  removeItemFromCart,
} from "../store/cart";
import { toast } from "react-toastify";
import QuantityButtons from "./quantityButtons";
import Button from "./button";
import {
  CartItem,
  Post,
  AddToCartItem,
  CheckoutType,
} from "../store/interfaces";
import { StateType } from "../store/interfaces";

class Checkout extends Component<{
  cartItems: CartItem[];
  post: Post;
  checkout: (cartItems: CheckoutType) => void;
  decreaseItemCountAction: (itemId: number) => void;
  addToCartAction: (addToCartItem: AddToCartItem) => void;
  removeItemFromCartAction: (itemId: number) => void;
}> {
  onPayment = (items: CheckoutType) => {
    this.props.checkout(items);
    toast.success("Successfully paid");
  };

  minusClick = (item: CartItem) => {
    console.log(item);
    this.props.decreaseItemCountAction(item.itemId);
  };
  plusClick = (item: CartItem) => {
    this.props.addToCartAction({ itemId: item.itemId, item });
  };
  deleteItem = (itemId: number) => {
    this.props.removeItemFromCartAction(itemId);
  };

  render() {
    const { cartItems, post } = this.props;
    let count = 0;
    let fullTotalAmount = 0;
    if (!cartItems || cartItems.length === 0) {
      return (
        <React.Fragment>
          <h2>Checkout</h2>
          <br />
          <h4>Cart is empty!!!</h4>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <h2> Checkout</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Title</th>
              <th scope="col" className="text-right">
                Price
              </th>
              <th scope="col">Quantity</th>
              <th scope="col" className="text-right">
                Total
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              count++;
              const total = item.cartCount * item.price;
              fullTotalAmount += total;
              return (
                <tr>
                  <th scope="row">{count}</th>
                  <td>{item.cardTitle}</td>
                  <td>{item.cardTitle}</td>
                  <td className="text-right">
                    <span>&#8377;</span>
                    {item.price}
                  </td>
                  {!post.transactionId && (
                    <td align="left">
                      <QuantityButtons
                        item={item}
                        count={item.cartCount}
                        minusClick={this.minusClick}
                        plusClick={this.plusClick}
                      />
                    </td>
                  )}
                  {post.transactionId && <td align="left">{item.cartCount}</td>}
                  <td className="text-right">
                    <span>&#8377;</span>
                    {total}
                  </td>
                  {!post.transactionId && (
                    <td align="left">
                      {" "}
                      <Button
                        name="Delete"
                        onClickEvent={this.deleteItem}
                        itemId={item.itemId}
                        buttonClass="btn-danger"
                      />
                    </td>
                  )}
                  {post.transactionId && <td></td>}
                </tr>
              );
            })}
            <tr>
              <th scope="row"></th>
              <td></td>
              <td></td>
              <td></td>

              <td>
                <b>Total</b>
              </td>
              <td className="text-right">
                <b>
                  <span>&#8377;</span>
                  {fullTotalAmount}
                </b>{" "}
                <br />
                {!post.transactionId && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      this.onPayment({ cartItems, fullTotalAmount })
                    }
                  >
                    Payment
                  </button>
                )}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {post.transactionId && (
          <CheckoutResponse
            transactionId={post.transactionId}
            responseMessage={post.responseMessage}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  cartItems: state.entities.cart.list.cartItems,
  fullTotalAmount: state.entities.cart.list.fullTotalAmount,
  post: state.entities.cart.list.post,
});

const mapDispatchingProps = (dispatch: Dispatch<any>) => ({
  checkout: () => dispatch(checkoutCart()),
  addToCartAction: (item: AddToCartItem) => dispatch(addToCart(item)),
  decreaseItemCountAction: (itemId: number) =>
    dispatch(decreaseItemCount({ itemId })),
  removeItemFromCartAction: (itemId: number) =>
    dispatch(removeItemFromCart({ itemId })),
});

export default connect(mapStateToProps, mapDispatchingProps)(Checkout);
