import React, {Component, PropTypes} from 'react';

// Transacion component - represents a single transaction item
export default class Transaction extends Component {
  render()
  {
    return (
        <tr className="transactionRow">
          <td className="transactionField dateField">
            <p>{this.props.transaction.date.toISOString().trim().split("T")[0]}</p>
          </td>
          <td className="transactionField descriptionField">
            <p>{this.props.transaction.description}</p>
          </td>
          <td className="transactionField accountField">
            <p>{this.props.transaction.account}</p>
          </td>
          <td className="transactionField ioField">
            <p>{this.props.transaction.io}</p>
          </td>
          <td className="transactionField amountField">
            <p>{this.props.transaction.amount}</p>
          </td>
        </tr>
    );
  }
}

Transaction.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  transaction: PropTypes.object.isRequired,
};
