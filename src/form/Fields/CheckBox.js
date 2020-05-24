import React from 'react';
import _ from 'lodash';
import { BaseField } from './BaseField';
import { getFieldPopover } from '../FormUtils';

export class CheckBox extends BaseField {
  handleChange = (e) => {
    const { data, fieldKeyPath, onChange } = this.props;
    const value = e.target.checked;
    _.set(data, fieldKeyPath, value);
    if (onChange) {
      onChange();
    }
  }

  getField = () => {
    const { checkBoxLabel, info, data, fieldKeyPath } = this.props;

    const checkboxComp = (
      <label className='checkbox-container'>
        <input
          type='checkbox'
          ref='input' value={_.get(data, fieldKeyPath, '')}
          onChange={e => this.handleChange(e)}
        />
        {checkBoxLabel}
      </label>
    );

    return (
      <React.Fragment key='checkbox-comp'>
        {checkboxComp}
        {info && getFieldPopover(info, fieldKeyPath + 'checkbox')}
      </React.Fragment>
    );
  }
}
