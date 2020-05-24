import React from 'react';
import _ from 'lodash';
import { BaseField } from './BaseField';

export class String extends BaseField {
  handleChange = () => {
    const { fieldKeyPath } = this.props;
    const value = this.refs.input.value;
    this.setValue(fieldKeyPath, value);
    super.handleChange(value);
  }

  validate () {
    const { fieldKeyPath } = this.props;
    return super.validate(this.getValue(fieldKeyPath));
  }

  getField = () => {
    const { fieldKeyPath } = this.props;
    return (
      <input
        type='text' className={
          _.get(this.context.Form.state.Errors, fieldKeyPath)
            ? 'form-control invalidInput'
            : 'form-control'
        }
        ref='input'
        value={this.getValue(fieldKeyPath, '')}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
      />
    );
  }
}
