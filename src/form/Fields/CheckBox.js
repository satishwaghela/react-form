import React from 'react';
import { BaseField } from './BaseField';
import { getFieldPopover } from '../FormUtils';

export class CheckBox extends BaseField {
  handleChange = (e) => {
    const value = e.target.checked;
    this.props.data[this.props.value] = value;
    const onChange = this.props.onChange;
    if (onChange) {
      onChange();
    }
  }

  getField = () => {
    const { value, checkBoxLabel, info } = this.props;

    const checkboxComp = (
      <label className='checkbox-container'>
        <input
          type='checkbox'
          ref='input' value={this.props.data[value] || ''}
          onChange={e => this.handleChange(e)}
        />
        {checkBoxLabel}
      </label>
    );

    return (
      <React.Fragment key='checkbox-comp'>
        {checkboxComp}
        {info && getFieldPopover(info, value + 'checkbox')}
      </React.Fragment>
    );
  }
}
