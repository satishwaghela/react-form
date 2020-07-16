import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { getHelperText, useCall } from './FieldUtils';

export default function FTextField (props) {
  const { TextFieldProps, form, fieldKeyPath, validation } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath, '');

  useCall(() => {
    if (validation) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator();
    }
  }, [value]);

  const handleChange = (event) => {
    const value = event.target.value;
    form.setFieldValue(fieldKeyPath, value);
  };

  return (
    <>
      <TextField
        error={!fieldMetaData.validating && !!fieldMetaData.error}
        fullWidth
        {...TextFieldProps}
        value={value}
        onChange={handleChange}
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
      />
      {getHelperText(fieldMetaData)}
    </>
  );
}

FTextField.propTypes = {
  TextFieldProps: PropTypes.object,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func
};
