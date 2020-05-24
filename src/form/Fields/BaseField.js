import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormGroup } from 'react-bootstrap';
import validation from '../ValidationRules';
import { getFieldPopover } from '../FormUtils';

export class BaseField extends Component {
  type = 'FormField';

  getField = () => {}

  getValidationError (value, fieldValidations) {
    fieldValidations = fieldValidations || this.props.validation;
    let errorMsg = '';
    if (fieldValidations) {
      fieldValidations.forEach((v) => {
        if (errorMsg === '') {
          errorMsg = validation[v](value, this.context.Form, this) || '';
        }
      });
    }
    return errorMsg;
  }

  setValidationError (errorMsg) {
    const { Form } = this.context;
    const { fieldKeyPath } = this.props;
    _.set(Form.state.Errors, fieldKeyPath, errorMsg);
    Form.setState(Form.state);
  }

  isValid (value, fieldValidations) {
    const { fieldKeyPath } = this.props;
    value = value || this.getValue(fieldKeyPath);
    return !this.getValidationError(value, fieldValidations);
  }

  validate (value, fieldValidations) {
    const error = this.getValidationError(value, fieldValidations);
    this.setValidationError(error);
  }

  getFieldInfo () {
    const { fieldInfo, fieldKeyPath } = this.props;
    return getFieldPopover(fieldInfo, fieldKeyPath, fieldKeyPath);
  }

  getErrorComp () {
    const { fieldKeyPath } = this.props;
    return <p className='text-danger'>{_.get(this.context.Form.state.Errors, fieldKeyPath)}</p>;
  }

  getFieldId () {
    return this.props.fieldKeyPath;
  }
  
  getValue (fieldKeyPath, defaultValue) {
    const { Form } = this.context;
    return _.get(Form.state.FormData, fieldKeyPath, defaultValue);
  }

  setValue (fieldKeyPath, value) {
    const { Form } = this.context;
    return _.set(Form.state.FormData, fieldKeyPath, value);
  }

  componentDidMount () {
    this.registerField();
  }

  componentDidUpdate () {
    this.registerField();
  }

  registerField () {
    const { fieldKeyPath } = this.props;
    const { Form } = this.context;
    Form.registerField(fieldKeyPath, this);
  }

  render () {
    const { className, label, subComp } = this.props;
    return (
      <FormGroup id={this.getFieldId() + '-container'} className={className}>
        {label && <label>{label} {this.getFieldInfo()}</label>}
        {this.getField()}
        {!!subComp && subComp}
        {this.getErrorComp()}
      </FormGroup>
    );
  }

  shouldDisable () {
    return this.context.Form.isReadOnly();
  }

  handleChange (value) {
    const { Form } = this.context;
    Form.setState(Form.state, () => {
      this.validate(value);
      Form.onFieldValueChange();
    });
  }
}

BaseField.propTypes = {
  validation: PropTypes.array,
  className: PropTypes.string,
  label: PropTypes.string,
  valuePath: PropTypes.string,
  fieldInfo: PropTypes.any,
  value: PropTypes.any,
  data: PropTypes.object,
  subComp: PropTypes.any
};

BaseField.contextTypes = {
  Form: PropTypes.object
};
