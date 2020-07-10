import React, { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { runValueChangeFlow, fieldStateComp } from './FieldUtils';

const String = forwardRef((props, ref) => {
  const { form, fieldKeyPath, attrs, validation, fieldStateCustom } = props;
  const { formState, getFieldValue, getFieldMetaData } = form;
  const value = getFieldValue(formState, fieldKeyPath, '');
  const fieldMetaData = getFieldMetaData(form.formState, fieldKeyPath);

  const handleChange = (e) => {
    const value = e.target.value;
    runValueChangeFlow(value, props);
  };

  useImperativeHandle(ref, () => ({
    getValidationError: validation ? (callback) => validation(value, formState, props, callback) : undefined
  }));

  return (
    <>
      <input
        type='text'
        {...attrs}
        value={value}
        onChange={handleChange}
      />
      {fieldStateCustom ? fieldStateCustom(fieldMetaData) : fieldStateComp(fieldMetaData)}
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
