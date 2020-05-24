import React from 'react';
import { BaseField } from './BaseField';

export class String extends BaseField {
  handleChange = () => {
    const value = this.refs.input.value;
    this.props.data[this.props.value] = value;
    super.handleChange(value);
  }

  validate () {
    return super.validate(this.props.data[this.props.value]);
  }

  getField = () => {
    return (
      <input
        type='text' className={
          this.context.Form.state.Errors[this.props.valuePath]
            ? 'form-control invalidInput'
            : 'form-control'
        }
        ref='input'
        value={this.props.data[this.props.value] || ''}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
      />
    );
  }
}
