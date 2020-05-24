import React from 'react';
import { BaseField } from './BaseField';

export class CheckBoxGroup extends BaseField {
  handleChange = (e, option) => {
    const { value } = this.props;
    const selected = this.props.data[value] || [];
    const index = selected.indexOf(option);
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(option);
    }
    this.props.data[value] = selected;
    super.handleChange(selected);
  }

  validate () {
    return super.validate(this.props.data[this.props.value]);
  }

  getField = () => {
    const { options, value } = this.props;
    const selected = this.props.data[value] || [];
    return (
      <fieldset className='fieldset-default'>
        <legend>{this.props.label}</legend>
        {options.map((opt) => {
          const label = opt.name;
          const checkboxComp = (
            <label className='checkbox-container display-block text-left'>
              <input
                type='checkbox'
                checked={selected.indexOf(opt) >= 0}
                onChange={e => this.handleChange(e, opt)}
              />
              {label}
            </label>
          );
          return checkboxComp;
        })}
      </fieldset>
    );
  }
}
