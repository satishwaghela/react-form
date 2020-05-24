import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    Form.state.Errors[this.props.valuePath] = errorMsg;
    Form.setState(Form.state);
  }

  isValid (value, fieldValidations) {
    value = value || this.props.data[this.props.value];
    return !this.getValidationError(value, fieldValidations);
  }

  validate (value, fieldValidations) {
    const error = this.getValidationError(value, fieldValidations);
    this.setValidationError(error);
  }

  getFieldInfo () {
    const { fieldInfo, value } = this.props;
    return getFieldPopover(fieldInfo, value, value);
  }

  getErrorComp () {
    return <p className='text-danger'>{this.context.Form.state.Errors[this.props.valuePath]}</p>;
  }

  getFieldId () {
    return this.props.value;
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
