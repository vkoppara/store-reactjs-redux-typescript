import React, { Component } from "react";

class CheckoutResponse extends Component<{
  transactionId: number;
  responseMessage: string;
}> {
  render() {
    const { transactionId, responseMessage } = this.props;
    return (
      <React.Fragment>
        <h2>Transaction Reference# - {transactionId}</h2>
        <br />
        <h2>Status - {responseMessage}</h2>
      </React.Fragment>
    );
  }
}

export default CheckoutResponse;
