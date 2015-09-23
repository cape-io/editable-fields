import React, { Component, PropTypes } from 'react';

import Input from './Input'

export default class Text extends Component {
  static propTypes = {
  }
  static defaultProps = {
  }
  handleChange(value) {
    const {onChange, validate, errorMessage, help} = this.props;
    let hasErrors = false;
    let helpTxt = help;
    if (validate) {
      hasErrors = validate(value);
      console.log('errors', hasErrors);
      helpTxt = errorMessage;
    }
    else {
      console.log('no validation');
    }
    onChange({hasErrors, value, help: helpTxt});
  }
  render() {
    const {onChange, defaultValue, ...other} = this.props;

    return (
      <Input
        type="text"
        value={defaultValue}
        {...other}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}
