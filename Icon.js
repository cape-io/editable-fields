import React, { Component, PropTypes } from 'react';

export default class Icon extends Component {
  static propTypes = {
    symbol: PropTypes.string.isRequired,
    className: PropTypes.string
  }
  static defaultProps = {
    hidden: 'false'
  }
  render() {
    const {symbol, className, hidden} = this.props;
    const classStr = `glyphicon glyphicon-${symbol} ${className}`
    return (
      <span className={classStr} aria-hidden={hidden}></span>
    );
  }
}
