import React from 'react';
import ReactSelect from 'react-select';
import { BaseField } from './BaseField';
import { findSingleValueOption } from '../FormUtils';

export class Select extends BaseField {
  handleChange = (selection) => {
    const value = selection.value;
    this.props.data[this.props.value] = value;
    super.handleChange(value);
  }

  getValue = () => {
    const { data, attrs } = this.props;
    const val = data[this.props.value];
    return findSingleValueOption(val, attrs.options, attrs.defaultValue);
  }

  validate () {
    return super.validate(this.getValue());
  }

  isValid () {
    return super.isValid(this.getValue());
  }

  getField = () => {
    return (
      <ReactSelect
        value={this.getValue()}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
      />
    );
  }
}
