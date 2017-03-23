import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Transactions } from '../api/transactions.js';
import Transaction from './Transaction.jsx';

// App component - represents the whole app
class App extends Component {

  renderTransactions() {
    return this.props.transactions.map((transaction) => (
      <Transaction key={transaction._id} transaction={transaction} />
    ));
  }

  handleSubmit(event){
    event.preventDefault();

    // Find the text field via the React ref
    const amount = ReactDOM.findDOMNode(this.refs.amount).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.description).value.trim();
    const account = Number(ReactDOM.findDOMNode(this.refs.account).value.trim());
    const io = ReactDOM.findDOMNode(this.refs.io).value.trim();
    //console.log("inserted! ", amount+ ":"+ account + ":" + description+ ":"+ io+ ":");

    Transactions.insert({
      amount: amount,
      account: account,
      description: description,
      io: io,
      date: new Date(), // current time
    });



    // Clear form
    ReactDOM.findDOMNode(this.refs.amount).value = '';
    ReactDOM.findDOMNode(this.refs.description).value = '';
  }

  render() {
    return (
      <div>
        <div className="container">
          <header>
            <h1>Kipcount</h1>
            <form className="new-transaction" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="amount"
              placeholder="Type amount"
            />
            <select
              ref="account"
              name="Account">
              <option value="1">Cash</option>
              <option value="2">Bank</option>
            </select>

            <select
              ref="io"
              name="Income or expense">
              <option value="in">Income</option>
              <option value="out">Expense</option>
            </select>
            <textarea
              name="message"
              rows="4"
              cols="20"
              ref="description"
              placeholder="Describe the transaction"
              >

            </textarea>
            <input type="submit" value="Submit" />
          </form>

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

App.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    transactions: Transactions.find({}).fetch(),
  };
}, App);
