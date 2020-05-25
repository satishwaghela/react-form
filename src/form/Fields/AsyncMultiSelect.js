import React from 'react';
import _ from 'lodash';
import ReactSelectAsync from 'react-select/async';
import { BaseField } from './BaseField';
import { toSelectObject } from '../FormUtils';

export class AsyncMultiSelect extends BaseField {
  handleChange = (selections) => {
    const { fieldKeyPath } = this.props;
    const value = _.map(selections, (selection) => selection.value);
    this.setValue(fieldKeyPath, value);
    super.handleChange(value);
  }

  toSelectObjectList (value) {
    return value.length ? _.map(value, (v) => {
      return toSelectObject(v);
    }) : null;
  }

  getField = () => {
    const { promiseOptions, fieldKeyPath } = this.props;

    const value = this.getValue(fieldKeyPath, []);
    const selectValue = this.toSelectObjectList(value);

    return (
      <ReactSelectAsync
        isMulti
        value={selectValue}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />
    );
  }
}

AsyncMultiSelect.defaultProps = {
  promiseOptions: () => null
};
