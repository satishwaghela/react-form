import React from 'react';
import { BaseField } from './BaseField';
import { getFieldPopover } from '../FormUtils';

export class CheckBox extends BaseField {
  handleChange = (e) => {
    const { fieldKeyPath } = this.props;
    const value = !this.getValue(fieldKeyPath);
    super.handleChange(value);
  }

  getField = () => {
    const { checkBoxLabel, info, fieldKeyPath } = this.props;
    const value = this.getValue(fieldKeyPath, '');

    const checkboxComp = (
      <label className='checkbox-container'>
        <input
          type='checkbox'
          ref={ref => {
            this.input = ref;
          }}
          value={value}
          onChange={e => this.handleChange(e)}
          checked={value}
        />
        {checkBoxLabel}
      </label>
    );

    return (
      <div key='checkbox-comp'>
        {checkboxComp}
        {info && getFieldPopover(info, fieldKeyPath + 'checkbox')}
      </div>
    );
  }
}
