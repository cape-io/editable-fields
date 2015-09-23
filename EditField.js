import React, { Component, PropTypes } from 'react';
import classNames from 'classNames'

import getInputType from './input/getInputType'
import EditableButtons from './Buttons'
import Help from './Help'
import Icon from './Icon';

// Manage help text.
// Bubble hasError (and value?) up.

export default class EditField extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
    this.state = {
      hasErrors: false,
      suggestion: '',
      help: '',
      value: props.defaultValue
    };
  }

  handleChange(result) {
    const {onValidation, required} = this.props;
    const {hasErrors, breakPoint, value} = result;
    let errs = hasErrors;
    let status = 'error';
    // get status.
    if (!hasErrors) {
      status = 'success';
    }
    else if (breakPoint === 'help') {
      status = 'warning';
    }
    if (!required && !value && errs) {
      errs = false;
      status = null;
    }
    // Pass status to parent.
    onValidation(status);
    // if (this.isMounted()) {}
    this.setState({...result, hasErrors: errs});
  }
  handleSuggestion(newVal) {
    this.setState({value: newVal});
  }
  render() {
    const {className, errorMessage, help, id, onSubmit, onClose, type, ...other} = this.props;
    const {suggestion, value, breakPoint, hasErrors} = this.state;
    const extraHelp = this.state.help;

    let helpTxt = hasErrors ? errorMessage : help;
    if (extraHelp) {
      helpTxt += ' ' + extraHelp;
    }
    let helpEl = false;
    if (helpTxt || suggestion) {
      helpEl =
        <Help
          help={helpTxt}
          hasErrors={hasErrors}
          id={id}
          suggestion={suggestion}
          onChange={this.handleSuggestion.bind(this)}
        />
    }
    // Decide what component the input is.
    const Input = getInputType(type);

    // let warningIcon = false;
    // if (hasErrors) {
    //   warningIcon = <Icon symbol="remove" className="form-control-feedback" />
    // }

    return (
      <div className={classNames("editable-form col-md-9", className)}>
        <div className="editable-row">
          <Input
            {...other}
            className="form-control"
            id={id}
            onChange={this.handleChange.bind(this)}
            value={value}
          />
          <EditableButtons
            disabled={hasErrors}
            onSubmit={() => {onSubmit(value)}}
            onClose={onClose}
          />
        </div>
        {helpEl}
      </div>
    );
  }
}
