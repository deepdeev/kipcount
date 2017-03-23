import React, { Component, PropTypes } from 'react';

// Transacion component - represents a single transaction item
export default class Transaction extends Component {
  render() {
    return (
      <li>{this.props.transaction.io}:{this.props.transaction.amount} </li>
    );
  }
}

Transaction.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  transaction: PropTypes.object.isRequired,
};
