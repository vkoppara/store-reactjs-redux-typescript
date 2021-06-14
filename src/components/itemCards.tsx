import React, { Component } from "react";
import Button from "./button";
import { Link } from "react-router-dom";

class ItemCards extends Component<{
  itemId: number;
  cardTitle: string;
  imgLink: string;
  price: number;
  cartCount: number;
  onAddToCart: (itemId: number) => void;
}> {
  render() {
    const { itemId, cardTitle, imgLink, price, cartCount, onAddToCart } =
      this.props;
    return (
      <div>
        <div className="card" title={cardTitle}>
          <Link to={`/item/${itemId}`}>
            <img
              style={{ width: 90, height: 58 }}
              src={imgLink}
              alt=""
              className="card-img-top m-3 clickable"
            />
          </Link>
          <div className="card-body" style={{ textAlign: "left" }}>
            <h5
              style={{
                fontSize: "10px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100px",
                whiteSpace: "nowrap",
              }}
              className="card-title"
            >
              {cardTitle}
            </h5>
            <h6 style={{ fontSize: "8px", color: "orange" }}>
              Price: <span></span>
              <span style={{ fontSize: "12px" }}>
                <b>&#8377;{price}</b>
              </span>
            </h6>

            <Button
              itemId={itemId}
              onClickEvent={onAddToCart}
              cartCount={cartCount}
              name="Add To Cart"
              buttonClass="btn-warning"
            />
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default ItemCards;
