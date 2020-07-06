import React, { Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import _ from 'lodash';
import { setFieldsValidationErrors, areFieldsValid, getValidity, normalizeForObjectKey } from './FormUtils';

export default class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  getChildContext () {
    return { form: this, formData: this.props.formData, errors: this.state.errors };
  }

  render () {
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }

  registerField (fieldKeyPath, fildComponent) {
    _.set(this, `fields.${normalizeForObjectKey(fieldKeyPath)}`, fildComponent);
  }

  deregisterField (fieldKeyPath) {
    this.fields = _.omit(this.fields, [normalizeForObjectKey(fieldKeyPath)]);
  }

  onFieldValueChange (newFormData) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(newFormData);
    }
  }

  validate (setStateCallback) {
    this.updateErrors((draftErrors) => {
      setFieldsValidationErrors(this.fields, draftErrors);
    }, setStateCallback)
  }

  isValid () {
    return areFieldsValid(this.fields);
  }

  getValidity () {
    return getValidity(this.fields);
  }

  isReadOnly () {
    return this.props.readOnly;
  }

  updateFormDataAndErrors = (callback) => {
    let formData, errors;
    formData = produce(this.props.formData, draftFormData => {
      errors = produce(this.state.errors, draftErrors => {
        callback(draftFormData, draftErrors);
      });
    });
    this.setState({ errors }, () => {
      this.onFieldValueChange(formData);
    });
  }

  updateErrors = (callback, setStateCallback) => {
    let errors;
    errors = produce(this.state.errors, draftErrors => {
      callback(draftErrors);
    });
    this.setState({ errors }, setStateCallback);
  }
}

Form.defaultProps = {
  showRequired: true,
  readOnly: false
};

Form.childContextTypes = {
  form: PropTypes.object,
  formData: PropTypes.object,
  errors: PropTypes.object
};

Form.propTypes = {
  formData: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};
