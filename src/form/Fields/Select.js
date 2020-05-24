import React from 'react';
import ReactSelect from 'react-select';
import { BaseField } from './BaseField';
import { findSingleValueOption } from '../FormUtils';

export class Select extends BaseField {
  handleChange = (selection) => {
    const value = selection.value;
    const { fieldKeyPath } = this.props;
    this.setValue(fieldKeyPath, value);
    super.handleChange(value);
  }

  getValue = () => {
    const { attrs, fieldKeyPath } = this.props;
    const val = super.getValue(fieldKeyPath);
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
