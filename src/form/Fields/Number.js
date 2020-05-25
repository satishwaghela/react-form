import React from 'react';
import _ from 'lodash';
import { String } from './String';

export class Number extends String {
  getField = () => {
    const { fieldKeyPath } = this.props;
    return (
      <input
        type='number'
        className={
          _.get(this.context.Form.state.Errors, fieldKeyPath)
            ? 'form-control invalidInput'
            : 'form-control'
        }
        ref='input'
        value={this.getValue(fieldKeyPath)}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
      />
    );
  }
}
