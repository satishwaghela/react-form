import React from 'react';
import _ from 'lodash';
import { BaseField } from './BaseField';

export class String extends BaseField {
  handleChange = () => {
    const { data, fieldKeyPath } = this.props;
    const value = this.refs.input.value;
    _.set(data, fieldKeyPath, value);
    super.handleChange(value);
  }

  validate () {
    const { data, fieldKeyPath } = this.props;
    return super.validate(_.get(data, fieldKeyPath));
  }

  getField = () => {
    const { data, fieldKeyPath } = this.props;
    return (
      <input
        type='text' className={
          _.get(this.context.Form.state.Errors, fieldKeyPath)
            ? 'form-control invalidInput'
            : 'form-control'
        }
        ref='input'
        value={_.get(data, fieldKeyPath, '')}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
      />
    );
  }
}
