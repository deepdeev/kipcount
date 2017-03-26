import React, {Component, PropTypes} from 'react';

export default class CustomCheckBox extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      type: this.props.type,
      index:this.props.index

    }
  }

  handleChange()
  {
    this.props.handleFiltersChange(this.state.index);
  }

  render()
  {
    return (
        <div className="checkbox-inline">
          <label>
            <input type="checkbox" value="" onChange={()=>{this.handleChange()}}></input>{this.state.type}
          </label>
        </div>
    );
  }
}
