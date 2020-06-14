import React, { Component } from 'react';

export default class SubmitBtn extends Component {
  constructor (props) {
    super(props);
    this.state = {
      disableBtn: props.defaultDisable || false
    };
  }
  
  setDisabled = () => {
    this.setState({ disableBtn: true });
  }
  
  unsetDisabled = () => {
    this.setState({ disableBtn: false });
  }

  render () {
    const { disableBtn } = this.state;
    const { onSubmit } = this.props;

    return (
      <button
        type='button'
        onClick={onSubmit}
        className={`btn btn-success ${disableBtn ? 'disable' : ''}`}
      >
        Submit
      </button>
    )
  }
}
