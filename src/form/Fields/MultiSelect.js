import React from 'react';
import _ from 'lodash';
import ReactSelect from 'react-select';
import { BaseField } from './BaseField';
import { findMultiValueOptions } from '../FormUtils';

export class MultiSelect extends BaseField {
  handleChange = (selections) => {
    const value = _.map(selections, (selection) => selection.value);
    this.props.data[this.props.value] = value;
    super.handleChange(value);
  }

  getValue = () => {
    const { data, attrs } = this.props;
    const val = data[this.props.value];
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
