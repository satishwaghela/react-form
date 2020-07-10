import React, { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { runValueChangeFlow } from './FieldUtils';

const String = forwardRef((props, ref) => {
  const { form, fieldKeyPath, attrs, validation, fieldStateCustom } = props;
  const { formState, getFieldValue, getFieldError, getFieldMetaData } = form;
  const value = getFieldValue(formState, fieldKeyPath, '');
  const error = getFieldError(form.formState, fieldKeyPath);
  const fieldMetaData = getFieldMetaData(form.formState, fieldKeyPath);

  const handleChange = (e) => {
    const value = e.target.value;
    runValueChangeFlow(value, props);
  };

  useImperativeHandle(ref, () => ({
    getValidationError: (callback) => validation(value, formState, props, callback)
  }));

  return (
    <>
      <input
        type='text'
        {...attrs}
        value={value}
        onChange={handleChange}
      />
      {!!fieldStateCustom && fieldStateCustom(fieldMetaData)}
      {(error && !fieldStateCustom) && <p className='text-danger field-error'>{error}</p>}
    </>
  );
});

String.propTypes = {
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  onValueChange: PropTypes.func,
  attrs: PropTypes.object,
  fieldStateCustom: PropTypes.func
};

export default String;
