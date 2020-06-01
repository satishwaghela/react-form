import React from 'react';
import { BaseField } from './BaseField';
import { getFieldPopover } from '../FormUtils';

export class CheckBox extends BaseField {
  handleChange = (e) => {
    const value = e.target.checked;
    super.handleChange(value);
  }

  getField = () => {
    const { checkBoxLabel, info, fieldKeyPath } = this.props;

    const checkboxComp = (
      <label className='checkbox-container'>
        <input
          type='checkbox'
          ref={ref => {
            this.input = ref;
          }}
          value={this.getValue(fieldKeyPath, '')}
          onChange={e => this.handleChange(e)}
        />
        {checkBoxLabel}
      </label>
    );

    return (
      <React.Fragment key='checkbox-comp'>
        <fieldset className='fieldset-default'>
          {checkboxComp}
        </fieldset>
        {info && getFieldPopover(info, fieldKeyPath + 'checkbox')}
      </React.Fragment>
    );
  }
}
