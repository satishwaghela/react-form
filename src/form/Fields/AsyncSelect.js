import React from 'react';
import ReactSelectAsync from 'react-select/async';
import { BaseField } from './BaseField';
import { toSelectObject } from '../FormUtils';

export class AsyncSelect extends BaseField {
  handleChange = (selection) => {
    const value = selection.value;
    super.handleChange(value);
  }

  getField = () => {
    const { promiseOptions, fieldKeyPath } = this.props;

    const value = this.getValue(fieldKeyPath);
    const selectValue = toSelectObject(value);

    return (
      <ReactSelectAsync
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

AsyncSelect.defaultProps = {
  promiseOptions: () => null
};
