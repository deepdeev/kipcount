import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Transactions} from '../api/transactions.js';
import Transaction from './Transaction.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import CustomDataPicker from './CustomDataPicker';
import CustomDateFilter from './CustomDateFilter';
import CustomCheckBox from './CustomCheckBox';

// App component - represents the whole app
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      types: [{type: "Cash", selected: false}, {type: "Bank", selected: false}, {type: "In", selected: false}, {type: "Out", selected: false}]

    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.changeDateFilter = this.changeDateFilter.bind(this);
    this.filteredTransactions = this.filteredTransactions.bind(this);
  }

  handleDateChange(value, date)
  {
    // this.setState({
    //   newTransactionDate: date,
    // });
  };

  filteredTransactions(){
    let filteredTransactions = this.props.transactions;
    if (!this.state.types[0].selected || !this.state.types[1].selected)
    {
      if (this.state.types[0].selected)
        filteredTransactions = filteredTransactions.filter((currentTransaction) =>
        {
          return currentTransaction.account == "Cash"
        });
      if (this.state.types[1].selected)
        filteredTransactions = filteredTransactions.filter((currentTransaction) =>
        {
          return currentTransaction.account == "Bank"
        });
    }
    if (!this.state.types[2].selected || !this.state.types[3].selected)
    {
      if (this.state.types[2].selected)
        filteredTransactions = filteredTransactions.filter((currentTransaction) =>
        {
          return currentTransaction.io == "In"
        });
      if (this.state.types[3].selected)
        filteredTransactions = filteredTransactions.filter((currentTransaction) =>
        {
          return currentTransaction.io == "Out"
        });
    }
    return filteredTransactions;
  }

  renderTransactions()
  {
    console.log('rendering transactions');
    console.log(this.state);
    console.log("------------------------");


    //const startDate = new Date(this.refs.startDate.value);
    //console.log(startDate);
    //const endDate = new Date(document.getElementById("endDate").value);
    //console.log(endDate);
    let filteredTransactions = this.filteredTransactions();
    return filteredTransactions.map((transaction) => (
        <Transaction key={transaction._id} transaction={transaction}/>
    ));
  }
  renderSummary(){
    let filteredTransactions = this.filteredTransactions();
    let q =  filteredTransactions.length
    let subtotal = 0;
    let qIn = 0;
    let qOut = 0;
    filteredTransactions.map( (transaction) => {
      if(transaction.io === "In"){
        subtotal += transaction.amount;
        qIn += 1;
      }
      else {
        subtotal -= transaction.amount;
        qOut +=1;
      }
    })

    return(
      <div>
        <div className="col-md-3 summaryTitle">
          Subtotal:
          <br></br>
          {subtotal}
        </div>
        <div className="col-md-3 summaryTitle">
          Quantity:
          <br></br>
          {q}
        </div>
        <div className="col-md-3 summaryTitle">
          In:
          <br></br>
          {qIn}
        </div>
        <div className="col-md-3 summaryTitle">
          Out:
          <br></br>
          {qOut}
        </div>

      </div>
    )
  }

  renderCheckBoxs()
  {
    //console.log(this.state);
    return this.state.types.map((currentType, index) => (
        <CustomCheckBox key={currentType.type} index={index} type={currentType.type}
                        handleFiltersChange={this.handleFiltersChange.bind(this)}/>
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
    let transactions = this.props.transactions;
    let values = [];
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
    let total = c1 + c2;
    values.push(total);
    values.push(c1);
    values.push(c2);
    // console.log("c1 "+c1);
    //  console.log("c2 "+c2);
    //  console.log("total "+total);
    return values;
  }
  changeDateFilter(dateType, value){

    if(dateType === "startDate"){
      this.setState({startDate: value})
    }
    else if(dateType === "endDate"){
      this.setState({endDate: value})
    } else{
      console.log("error")
    }
  }

  handleFiltersChange(index)
  {
    let temp = this.state.types;
    temp[index].selected = !temp[index].selected;
    this.setState({types: temp});

    // console.log(this.state.types[index].type + "  " + this.state.types[index].selected);
  }

  render()
  {
    return (

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
                      <h3>Filters</h3>
                    </div>
                    <div className="col-md-10">
                      <div className="col-md-6">
                        <form className="checkBoxes">
                          {this.renderCheckBoxs()}

                        </form>
                      </div>
                      <div className="col-md-6">
                        <div className="startDate col-md-6 addTransactionBtn">
                          Start Date:
                          <CustomDateFilter dateType={"startDate"} changeDateFilter={this.changeDateFilter}/>
                        </div>
                        <div className="endDate col-md-6 addTransactionBtn">
                          End Date:
                          <CustomDateFilter dateType={"endDate"} changeDateFilter={this.changeDateFilter}/>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-md-12 addTransactionBox box">
                  <div className="form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                      <div className="col-md-2 transactionsTitle2">
                        <h3>Add Transaction</h3>
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
                      <h3>Summary</h3>
                    </div>
                    <div className="col-md-10 transactionsTitle2">
                      {this.renderSummary()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }
}

App.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default createContainer(() =>
{
  return {
    transactions: Transactions.find({}, { sort: { date: -1 } }).fetch(),
  };
}, App);
