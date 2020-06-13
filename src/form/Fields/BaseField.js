import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormGroup } from 'react-bootstrap';
import validation from '../ValidationRules';
import { FieldLabel } from './FieldLabel';
import { normalizeFieldKeyPath } from '../FormUtils';

export class BaseField extends Component {
  type = 'FormField';

  getField = () => {}

  getValidationError (value, fieldValidations) {
    fieldValidations = fieldValidations || this.props.validation;
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
    _.set(form.state.errors, normalizeFieldKeyPath(fieldKeyPath), errorMsg);
    form.setState(form.state);
  }

  isValid (value, fieldValidations) {
    const { fieldKeyPath } = this.props;
    value = value || this.getValue(fieldKeyPath);
    return !this.getValidationError(value, fieldValidations);
  }

  validate (value, fieldValidations) {
    const { fieldKeyPath } = this.props;
    value = value || this.getValue(fieldKeyPath);
    const error = this.getValidationError(value, fieldValidations);
    this.setValidationError(error);
  }

  getErrorComp () {
    const { fieldKeyPath } = this.props;
    return <p className='text-danger'>{_.get(this.context.form.state.errors, normalizeFieldKeyPath(fieldKeyPath))}</p>;
  }

  getFieldId () {
    return this.props.fieldKeyPath;
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
      <FormGroup id={this.getFieldId() + '-container'} className={className}>
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
    form.onFieldValueChange(copyFormData, () => {
      this.validate(value);
      if (onChange) {
        onChange();
      }
    });
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
  form: PropTypes.object
};
