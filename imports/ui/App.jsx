import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Transactions} from '../api/transactions.js';
import Transaction from './Transaction.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import CustomDataPicker from './CustomDataPicker';

// App component - represents the whole app
class App extends Component {


  constructor(props)
  {
    super(props);

    // this.state = {
    //   newTransactionDate: new Date(),
    // };

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(value, date)
  {
    // this.setState({
    //   newTransactionDate: date,
    // });
  };

  renderTransactions()
  {
    return this.props.transactions.map((transaction) => (
        <Transaction key={transaction._id} transaction={transaction}/>
    ));
  }

  handleSubmit(event)
  {
    event.preventDefault();

    // Find the text field via the React ref
    const amount = parseInt(ReactDOM.findDOMNode(this.refs.amount).value.trim());
    const description = ReactDOM.findDOMNode(this.refs.description).value.trim();
    const account = ReactDOM.findDOMNode(this.refs.account).value.trim();
    const io = ReactDOM.findDOMNode(this.refs.io).value.trim();
    // const date = this.state.newTransactionDate;
    const date = new Date(document.getElementById("addTransactionDatePicker").value);
    // const date = new Date();

    if (!isNaN(amount))
    {
      Transactions.insert({
        amount: amount,
        account: account,
        description: description,
        io: io,
        date: date // date selected by the user
      });
      console.log("inserted! ", amount + ":" + account + ":" + description + ":" + io + ":" + date);
    }


    // Clear form
    ReactDOM.findDOMNode(this.refs.amount).value = '';
    ReactDOM.findDOMNode(this.refs.description).value = '';
  }

  calculateValues()
  {
    transactions = this.props.transactions;
    let values = [];
    let total = 0;
    let c1 = 0;
    let c2 = 0;
    for (let i = 0; i < transactions.length; i++)
    {
      if (transactions[i].account == "Cash")
      {
        if (transactions[i].io == "In")
        {
          c1 += transactions[i].amount;
        }
        else
        {
          c1 -= transactions[i].amount;
        }
      }
      else
      {
        if (transactions[i].io == "In")
        {
          c2 += transactions[i].amount;
        }
        else
        {
          c2 -= transactions[i].amount;
        }
      }
    }
    total = c1 + c2;
    values.push(total);
    values.push(c1);
    values.push(c2);
    // console.log("c1 "+c1);
    //  console.log("c2 "+c2);
    //  console.log("total "+total);
    return values;
  }

  render()
  {
    return (
        <MuiThemeProvider>
          <div className="container">
            <div className="row principal">
              <div className="col-md-3">
                <div className="row accountsPanel panel">
                  <div className="col-md-12 totalBox box">
                    <h3 className="accountTitle">Total</h3>
                    <h1 className="bigNumber">{this.calculateValues()[0]}</h1>
                  </div>
                  <div className="col-md-12 account1Box box">
                    <h3 className="accountTitle">Cash</h3>
                    <h1 className="bigNumber">{this.calculateValues()[1]}</h1>
                    <div className="accountsText">Last Transaction: -100.000 in 21/03/2017</div>
                  </div>
                  <div className="col-md-12 account2Box box">
                    <h3 className="accountTitle">Bank Account</h3>
                    <h1 className="bigNumber">{this.calculateValues()[2]}</h1>
                    <div className="accountsText">Last Transaction: +200.000 in 21/03/2017</div>
                  </div>
                </div>
              </div>

              <div className="col-md-9">
                <div className="row transactionsPanel panel">
                  <div className="col-md-12 filtersBox box">
                    <div className="row">
                      <div className="col-md-2 transactionsTitle1">
                        <h4>Filters</h4>
                      </div>
                      <div className="col-md-10">
                        <form className="checkBoxes">
                          <div className="checkbox-inline">
                            <label><input type="checkbox" value=""></input>Cash</label>
                          </div>
                          <div className="checkbox-inline">
                            <label><input type="checkbox" value=""></input>Bank Account</label>
                          </div>
                          <div className="checkbox-inline">
                            <label><input type="checkbox" value=""></input>Income</label>
                          </div>
                          <div className="checkbox-inline">
                            <label><input type="checkbox" value=""></input>Discharge</label>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 addTransactionBox box">
                    <div className="form" onSubmit={this.handleSubmit.bind(this)}>
                      <div className="row">
                        <div className="col-md-2 transactionsTitle2">
                          <h4>Add Transaction</h4>
                        </div>
                        <div className="col-md-10">
                          <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="row">
                              <div className="col-md-2 addTransactionField">
                                <input type="text" className="form-control" id="amount" ref="amount"
                                       placeholder="Amount"/>
                              </div>
                              <div className="col-md-4 addTransactionField">
                                <input type="text" className="form-control" id="description" ref="description"
                                       placeholder="Description"/>
                              </div>
                              <div className="col-md-2 addTransactionField">
                                <select className="form-control littleSelectList" ref="account" name="account">
                                  <option value="Cash">Cash</option>
                                  <option value="Bank">Bank</option>
                                </select>
                              </div>
                              <div className="col-md-1 addTransactionField ">
                                <select className="form-control littleSelectList" ref="io" name="io">
                                  <option value="In">In</option>
                                  <option value="Out">Out</option>
                                </select>
                              </div>
                              <div className="col-md-2 addTransactionBtn">
                                <CustomDataPicker/>
                              </div>
                              <div className="col-md-1 addTransactionBtn">
                                <button type="submit" className="btn btn-default"><i className="fa fa-save"> </i>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 transactionsBox box">
                    <div className="table-responsive">
                      <table className="table table-hover ">
                        <tbody>
                        {this.renderTransactions()}
                        </tbody>

                      </table>
                    </div>
                  </div>
                  <div className="col-md-12 summaryBox box">
                    <div className="row">
                      <div className="col-md-2 transactionsTitle2">
                        <h4>Summary</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default createContainer(() =>
{
  return {
    transactions: Transactions.find({}).fetch(),
  };
}, App);
