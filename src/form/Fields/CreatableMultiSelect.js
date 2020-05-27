import React from 'react';
import _ from 'lodash';
import Creatable from 'react-select/creatable';
import { MultiSelect } from './MultiSelect';
import { findMultiValueOptions } from '../FormUtils';

export class CreatableMultiSelect extends MultiSelect {
  handleChange = (selections) => {
    const { fieldKeyPath } = this.props;
    const value = _.map(selections, (selection) => selection.value);
    this.setValue(fieldKeyPath, value);
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

  getSelectValue = () => {
    const { attrs, fieldKeyPath } = this.props;
    const val = this.getValue(fieldKeyPath);
    this.addNewOption(_.map(val, v => ({ label: v, value: v })));
    return findMultiValueOptions(val, attrs.options, attrs.defaultValue);
  }

  getField = () => {
    return (
      <Creatable
        value={this.getSelectValue()}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        isMulti
        onChange={this.handleChange}
      />
    );
  }
}
