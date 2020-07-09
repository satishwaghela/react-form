import React from 'react';
import _ from 'lodash';
import { BaseField } from './BaseField';
import { childPath, setFieldValidationErrors } from '../FormUtils';

export class ArrayAddRemove extends BaseField {
  handleChange = (value) => {
    super.handleChange(value);
  }

  handleReplace = (replaceValue, index) => {
    const { fieldKeyPath } = this.props;
    this.getForm().updateFormDataAndErrors((draftFormData, draftErrors) => {
      const value = _.get(draftFormData, fieldKeyPath, []);
      value.splice(index, 1, replaceValue);
      this.setValue(draftFormData, fieldKeyPath, value);
    });
  }

  handleAdd = (addValue) => {
    const { fieldKeyPath } = this.props;
    this.getForm().updateFormDataAndErrors((draftFormData, draftErrors) => {
      const value = _.get(draftFormData, fieldKeyPath, []);
      value.push(addValue);
      this.setValue(draftFormData, fieldKeyPath, value);
      const errorMsg = this.getValidationError(value);
      setFieldValidationErrors(draftErrors, fieldKeyPath, errorMsg);
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

      const errorMsg = this.getValidationError(value);
      setFieldValidationErrors(draftErrors, fieldKeyPath, errorMsg);
    });
  }

  getField = () => {
    const { fieldKeyPath, Child } = this.props;
    const valueArr = this.getValue(fieldKeyPath, []);
    return (
      <div>
        {_.map(valueArr, (value, i) => {
          const childFieldKeyPath = `${fieldKeyPath}.${i}`
          return (
            <Child
              key={childFieldKeyPath}
              fieldKeyPath={childFieldKeyPath}
              value={value}
              onRemove={e => this.handleRemove(e, i)}
            />
          )
        })}
      </div>
    );
  }
}
