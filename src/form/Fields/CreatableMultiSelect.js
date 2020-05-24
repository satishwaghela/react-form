import React from 'react';
import _ from 'lodash';
import Creatable from 'react-select/creatable';
import { MultiSelect } from './MultiSelect';
import { findMultiValueOptions } from '../FormUtils';

export class CreatableMultiSelect extends MultiSelect {
  handleChange = (selections) => {
    const value = _.map(selections, (selection) => selection.value);
    this.props.data[this.props.value] = value;
    super.handleChange(value);
  }

  addNewOption = (selections) => {
    const { attrs } = this.props;
    _.each(selections, (v) => {
      if (!_.find(attrs.options, (o) => o.value === v.value)) {
        attrs.options.push(v);
      }
    });
  }

  getValue = () => {
    const { data, attrs } = this.props;
    const val = data[this.props.value];
    this.addNewOption(_.map(val, v => ({ label: v, value: v })));
    return findMultiValueOptions(val, attrs.options, attrs.defaultValue);
  }

  getField = () => {
    return (
      <Creatable
        value={this.getValue()}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        isMulti
        onChange={this.handleChange}
      />
    );
  }
}
