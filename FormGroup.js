import React, { Component, PropTypes } from 'react';

import classNames from 'classNames'

// Editable formGroup.

export default class FormGroup extends Component {
  static propTypes = {
    label: PropTypes.string,
    hasErrors: PropTypes.bool,
    required: PropTypes.bool
  }
  static defaultProps = {
    hasErrors: false
  }
  render() {
    const {label, status, id, required, children, editable, className} = this.props;
    const cssClasses = {
      editable,
      'form-group': true,
      'has-error': (status === 'error'),
      'has-success': (status === 'success'),
      'has-warning': (status === 'warning'),
      'has-feedback': status
    };
    let labelEl = false;
    if (label) {
      const labelStr = `${label}: `
      labelEl = <label className="control-label col-md-3" htmlFor={id}>
        {labelStr}
        {required ? ' *' : false}
      </label>
    }

    return (
      <div className={classNames(cssClasses, className)} id={`${id}-group`}>
        {labelEl}
        {children}
      </div>
    );
  }
}
