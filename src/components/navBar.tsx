import React, { Component, Dispatch } from "react";
import { Link, NavLink } from "react-router-dom";
import Cart from "../common/cart";
import { connect } from "react-redux";
import { StateType } from "../store/interfaces";

class NavBar extends Component<{
  cartCount: number;
}> {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Store
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login/Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/checkout">
                  Checkout
                </NavLink>
              </li>
            </ul>
            <Cart addToCartCount={this.props.cartCount} cartLink="/checkout" />
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  cartCount: state.entities.cart.list.cartCount,
});

const mapDispatchingProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchingProps)(NavBar);
