import React, {Component, PropTypes} from 'react';
let DatePicker = require("react-bootstrap-date-picker");
// Custom Data Picker component - allow the user to select a date to apply a filter

//Manejo de espaciado para que el textField no toque el borde podria hacerse por css

export default class CustomDateFilter extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      value: new Date().toISOString()
    };
    this.handleChange=this.handleChange.bind(this);
  }


  handleChange(value, formattedValue)
  {
    this.setState({
      value: value // ISO String, ex: "2016-11-19T12:00:00.000Z"
    // //   formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    });
    this.props.changeDateFilter(this.props.dateType, value);
  }

  componentDidUpdate()
  {
    // Access ISO String and formatted values from the DOM.
    // var hiddenInputElement = document.getElementById("addTransactionDatePicker");
    // console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    // console.log(hiddenInputElement.getAttribute('data-formattedvalue')); // Formatted String, ex: "11/19/2016"
  }

  render()
  {
    return (
        <DatePicker id={this.props.dateType} value={this.state.value} onChange={this.handleChange} showClearButton={false}/>
    );
  }
}
