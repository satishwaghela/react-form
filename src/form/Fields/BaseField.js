import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormGroup } from 'react-bootstrap';
import validation from '../ValidationRules';
import { FieldLabel } from './FieldLabel';
import { errorPath, normalizeForObjectKey, setFieldValidationErrors } from '../FormUtils';

export class BaseField extends Component {
  type = 'FormField';

  getField = () => {}

  getValidationError (value) {
    const fieldValidations =  this.props.validation;
    let errorMsg = '';
    if (fieldValidations) {
      fieldValidations.forEach((v) => {
        if (errorMsg === '') {
          errorMsg = validation[v](value, this.context.form, this) || '';
        }
      });
    }
    return errorMsg;
  }

  setValidationError (errorMsg) {
    const { fieldKeyPath } = this.props;
    this.getForm().updateErrors((draftErrors) => {
      _.set(draftErrors, errorPath(fieldKeyPath), errorMsg);
    })
  }

  isValid (value) {
    const { fieldKeyPath } = this.props;
    value = value || this.getValue(fieldKeyPath);
    return !this.getValidationError(value);
  }

  validate () {
    const { fieldKeyPath } = this.props;
    const value = this.getValue(fieldKeyPath);
    const error = this.getValidationError(value);
    this.setValidationError(error);
  }

  validateValue (value) {
    const error = this.getValidationError(value);
    this.setValidationError(error);
  }

  getErrorComp () {
    const { fieldKeyPath } = this.props;
    const errorMsg = _.get(this.context.errors, errorPath(fieldKeyPath));
    return errorMsg && <p className='text-danger field-error'>{errorMsg}</p>;
  }

  getFieldId () {
    return normalizeForObjectKey(this.props.fieldKeyPath);
  }

  getValue (fieldKeyPath, defaultValue) {
    const { formData } = this.context;
    return _.get(formData, fieldKeyPath, defaultValue);
  }

  setValue (formData, fieldKeyPath, value) {
    return _.set(formData, fieldKeyPath, value);
  }

  componentDidMount () {
    this.registerField();
  }

  componentDidUpdate () {
    this.registerField();
  }

  componentWillUnmount () {
    this.deregisterField();
  }

  registerField () {
    const { fieldKeyPath } = this.props;
    const { form } = this.context;
    form.registerField(fieldKeyPath, this);
  }

  deregisterField () {
    const { fieldKeyPath } = this.props;
    const { form } = this.context;
    form.deregisterField(fieldKeyPath);
  }

  render () {
    const { className, label, validation = [], fieldInfo } = this.props;
    return (
      <FormGroup id={this.getFieldId() + '-container'} ref={ref => { this.container = ref; }} className={className}>
        {label && (
          <FieldLabel
            text={label}
            isRequired={validation.includes('required')}
            info={fieldInfo}
          />
        )}
        {this.getField()}
        {this.getErrorComp()}
      </FormGroup>
    );
  }

  shouldDisable () {
    return this.context.form.isReadOnly();
  }

  handleChange (value) {
    const { onChange, fieldKeyPath } = this.props;
    this.getForm().updateFormDataAndErrors((draftFormData, draftErrors) => {
      this.setValue(draftFormData, fieldKeyPath, value);
      const errorMsg = this.getValidationError(value);
      setFieldValidationErrors(draftErrors, fieldKeyPath, errorMsg);
      if (onChange) {
        onChange(value, draftFormData, draftErrors);
      }
    });
  }

  getForm = () => {
    return _.get(this, 'context.form');
  }
}

BaseField.propTypes = {
  validation: PropTypes.array,
  className: PropTypes.string,
  label: PropTypes.string,
  fieldKeyPath: PropTypes.string,
  fieldInfo: PropTypes.any,
  onChange: PropTypes.func
};

BaseField.contextTypes = {
  form: PropTypes.object,
  formData: PropTypes.object,
  errors: PropTypes.object
};
