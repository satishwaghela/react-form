import React from 'react';
import _ from 'lodash';
import ReactSelect from 'react-select';
import { BaseField } from './BaseField';
import { findMultiValueOptions } from '../FormUtils';

export class MultiSelect extends BaseField {
  handleChange = (selections) => {
    const { fieldKeyPath } = this.props;
    const value = _.map(selections, (selection) => selection.value);
    this.setValue(fieldKeyPath, value);
    super.handleChange(value);
  }

  getValue = () => {
    const { attrs, fieldKeyPath } = this.props;
    const val = super.getValue(fieldKeyPath);
    return findMultiValueOptions(val, attrs.options, attrs.defaultValue);
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
        isMulti
        onChange={this.handleChange}
      />
    );
  }
}
