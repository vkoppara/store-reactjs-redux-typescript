import React, { Component } from "react";
import { Link } from "react-router-dom";

class Cart extends Component<{
  addToCartCount: number;
  cartLink: string;
}> {
  state = {};
  render() {
    const { addToCartCount, cartLink } = this.props;
    return (
      <Link to={cartLink}>
        <i className="fa fa-2x fa-shopping-cart clickable">
          {addToCartCount !== 0 ? (
            <span style={{ fontSize: 7 }} className="badge bg-primary">
              {addToCartCount}
            </span>
          ) : (
            ""
          )}
        </i>
      </Link>
    );
  }
}

export default Cart;
