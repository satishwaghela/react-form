import React from 'react';
import _ from 'lodash';
import ReactSelect from 'react-select';
import { BaseField } from './BaseField';
import { findMultiValueOptions } from '../FormUtils';

export class MultiSelect extends BaseField {
  handleChange = (selections) => {
    const value = _.map(selections, (selection) => selection.value);
    super.handleChange(value);
  }

  getSelectValue = () => {
    const { attrs, fieldKeyPath } = this.props;
    const val = this.getValue(fieldKeyPath);
    return findMultiValueOptions(val, attrs.options, attrs.defaultValue);
  }

  getField = () => {
    return (
      <ReactSelect
        value={this.getSelectValue()}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        isMulti
        onChange={this.handleChange}
      />
    );
  }
}
