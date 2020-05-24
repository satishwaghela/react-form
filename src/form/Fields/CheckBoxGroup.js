import React from 'react';
import _ from 'lodash';
import { BaseField } from './BaseField';

export class CheckBoxGroup extends BaseField {
  handleChange = (e, option) => {
    const { data, fieldKeyPath } = this.props;
    const selected = _.get(data, fieldKeyPath, []);
    const index = selected.indexOf(option);
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(option.value);
    }
    _.set(data, fieldKeyPath, selected);
    super.handleChange(selected);
  }

  validate () {
    const { data, fieldKeyPath } = this.props;
    return super.validate(_.get(data, fieldKeyPath));
  }

  getField = () => {
    const { options, data, fieldKeyPath } = this.props;
    const selected = _.get(data, fieldKeyPath, []);
    return (
      <fieldset className='fieldset-default'>
        <legend>{this.props.label}</legend>
        {options.map((opt) => {
          const label = opt.name;
          const checkboxComp = (
            <label className='checkbox-container display-block text-left'>
              <input
                type='checkbox'
                checked={!!_.find(selected, (s) => s === opt.value)}
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
