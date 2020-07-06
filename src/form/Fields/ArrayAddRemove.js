import React from 'react';
import _ from 'lodash';
import { BaseField } from './BaseField';
import { childPath } from '../FormUtils';

export class ArrayAddRemove extends BaseField {
  handleChange = (value) => {
    super.handleChange(value);
  }

  handleAdd = (e) => {
    const { fieldKeyPath } = this.props;
    this.getForm().updateFormDataAndErrors((draftFormData, draftErrors) => {
      const value = _.get(draftFormData, fieldKeyPath, []);
      value.push(undefined);
      this.setValue(draftFormData, fieldKeyPath, value);
    });
  }

  handleRemove = (e, i) => {
    const { fieldKeyPath } = this.props;
    this.getForm().updateFormDataAndErrors((draftFormData, draftErrors) => {
      const value = _.get(draftFormData, fieldKeyPath, []);
      value.splice(i, 1);
      _.set(draftFormData, fieldKeyPath, value);

      const errors = _.get(draftErrors, childPath(fieldKeyPath), []);
      errors.splice(i, 1);
    });
  }

  getField = () => {
    const { fieldKeyPath, Child } = this.props;
    const valueArr = this.getValue(fieldKeyPath, []);
    return (
      <div>
        {_.map(valueArr, (value, i) => {
          const baseFieldKeyPath = `${fieldKeyPath}.${i}`
          return (
            <Child
              key={baseFieldKeyPath}
              baseFieldKeyPath={baseFieldKeyPath}
              value={value}
              onRemove={e => this.handleRemove(e, i)}
            />
          )
        })}
        <button onClick={this.handleAdd}>Add</button>
      </div>
    );
  }
}
