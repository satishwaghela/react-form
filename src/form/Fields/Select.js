import React from 'react';
import _ from 'lodash';
import ReactSelect from 'react-select';
import { BaseField } from './BaseField';
import { findSingleValueOption } from '../FormUtils';

export class Select extends BaseField {
  handleChange = (selection) => {
    const value = selection.value;
    const { data, fieldKeyPath } = this.props;
    _.set(data, fieldKeyPath, value);
    super.handleChange(value);
  }

  getValue = () => {
    const { data, attrs, fieldKeyPath } = this.props;
    const val = _.get(data, fieldKeyPath);
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
