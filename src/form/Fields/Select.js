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

  getSelectValue = () => {
    const { attrs, fieldKeyPath } = this.props;
    const val = this.getValue(fieldKeyPath);
    return findSingleValueOption(val, attrs.options, attrs.defaultValue);
  }

  getField = () => {
    return (
      <ReactSelect
        value={this.getSelectValue()}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
      />
    );
  }
}
