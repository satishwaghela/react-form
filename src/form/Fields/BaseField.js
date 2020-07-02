import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormGroup } from 'react-bootstrap';
import validation from '../ValidationRules';
import { FieldLabel } from './FieldLabel';
import { errorPath, normalizeForObjectKey } from '../FormUtils';

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
    const { form } = this.context;
    const { fieldKeyPath } = this.props;
    const errors = _.get(form, 'state.errors', {});
    _.set(errors, errorPath(fieldKeyPath), errorMsg);
    form.setErrors(errors);
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
    return <p className='text-danger'>{_.get(this.context.form.state.errors, errorPath(fieldKeyPath))}</p>;
  }

  getFieldId () {
    return normalizeForObjectKey(this.props.fieldKeyPath);
  }

  getValue (fieldKeyPath, defaultValue) {
    const { form } = this.context;
    return _.get(form.props.formData, fieldKeyPath, defaultValue);
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

  registerField () {
    const { fieldKeyPath } = this.props;
    const { form } = this.context;
    form.registerField(fieldKeyPath, this);
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
    const { form } = this.context;
    const { formData } = form.props;
    const copyFormData = _.cloneDeep(formData);
    this.setValue(copyFormData, fieldKeyPath, value);
    if (onChange) {
      onChange(value, copyFormData);
    }
    form.onFieldValueChange(copyFormData);
    this.validateValue(value);
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
