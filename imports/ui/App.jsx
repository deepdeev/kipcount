import React, { Component } from 'react';

import Transaction from './Transaction.jsx';

// App component - represents the whole app
export default class App extends Component {
  getTransactions() {
    return [
      { _id: 1, text: 'This is transaction 1' },
      { _id: 2, text: 'This is transaction 2' },
      { _id: 3, text: 'This is transaction 3' },
    ];
  }

  renderTransactions() {
    return this.getTransactions().map((transaction) => (
      <Transaction key={transaction._id} transaction={transaction} />
    ));
  }

  render() {
    return (
      <div>
        <div className="container">
          <header>
            <h1>Kipcount</h1>
          </header>

          <ul>
            {this.renderTransactions()}
          </ul>

          <div className="summary">
            Here we will have the summary of the current transactions
          </div>
        </div>

        <div className="total">
          Total panel with the general balance of the person
        </div>

        <div className="accounts">
          accounts information
        </div>

      </div>

    );
  }
}
