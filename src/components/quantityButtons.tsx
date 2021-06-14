import React, { Component } from "react";

class QuantityButtons extends Component<{
  count: number;
  minusClick: (item: any) => void;
  plusClick: (item: any) => void;
  item: any;
}> {
  render() {
    console.log("Quantity");
    const { count, minusClick, plusClick, item } = this.props;
    return (
      <div className="qty mt-s">
        <span className="minus bg-dark" onClick={() => minusClick(item)}>
          -
        </span>
        <input
          type="number"
          disabled={true}
          name="qty"
          value={count}
          className="count"
        ></input>
        <span className="plus bg-dark" onClick={() => plusClick(item)}>
          +
        </span>
      </div>
    );
  }
}

export default QuantityButtons;
