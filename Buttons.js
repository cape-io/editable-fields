import React, { Component, PropTypes } from 'react';
import Icon from './Icon';

export default class EditableButtons extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }
  render() {
    const {onSubmit, onClose, disabled} = this.props;

    return (
      <div className="editable-buttons">
        <button
          className="btn btn-success btn-sm editable-submit"
          disabled={disabled}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Icon symbol="ok" />
        </button>
        <button
          className="btn btn-warning btn-sm editable-close"
          type="button"
          onClick={onClose}
        >
          <Icon symbol="remove" />
        </button>
      </div>
    );
  }
}
