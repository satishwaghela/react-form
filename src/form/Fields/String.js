import React from 'react';
import _ from 'lodash';
import { BaseField } from './BaseField';

export class String extends BaseField {
  handleChange = () => {
    const value = this.input.value;
    super.handleChange(value);
  }

  getField = () => {
    const { fieldKeyPath } = this.props;
    return (
      <input
        type='text' className={
          _.get(this.context.form.state.errors, fieldKeyPath)
            ? 'form-control invalidInput'
            : 'form-control'
        }
        ref={ref => { this.input = ref; }}
        value={this.getValue(fieldKeyPath, '')}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
      />
    );
  }
}
