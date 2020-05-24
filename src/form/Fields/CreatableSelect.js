import React from 'react';
import _ from 'lodash';
import Creatable from 'react-select/creatable';
import { Select } from './Select';
import { findSingleValueOption } from '../FormUtils';

export class CreatableSelect extends Select {
  handleChange = (selection) => {
    const { data, fieldKeyPath } = this.props;
    const value = selection.value;
    _.set(data, fieldKeyPath, value);
    super.handleChange(value);
  }

  addNewOption = (selection) => {
    const { attrs } = this.props;
    if (!_.find(attrs.options, (o) => o.value === selection.value)) {
      attrs.options.push(selection);
    }
  }

  getValue = () => {
    const { data, attrs, fieldKeyPath } = this.props;
    const val = _.get(data, fieldKeyPath);
    this.addNewOption({ label: val, value: val });
    return findSingleValueOption(val, attrs.options, attrs.defaultValue);
  }

  getField = () => {
    return (
      <Creatable
        value={this.getValue()}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
      />
    );
  }
}
