import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function FFTextField(props) {
  const { TextFieldProps, form, fieldKeyPath, validation, onValueChange } = props;
  const { formState } = form;
  const fieldMetaData = form.getFieldMetaData(formState, fieldKeyPath);

  const handleChange = (event) => {
    const value = event.target.value;
    const newFormState = { ...formState };
    form.setFieldValue(newFormState, fieldKeyPath, value);
    if (onValueChange) {
      onValueChange(value, newFormState);
    }
    if (validation) {
      const validator = form.getValidator(newFormState, fieldKeyPath, value);
      validator();
    }
    form.setFormState(newFormState);
  }

  let helperText;
  if (fieldMetaData.error) {
    helperText = fieldMetaData.error;
  }
  if (fieldMetaData.validating) {
    helperText = 'Validating...';
  }

  return (
    <TextField
      error={!!fieldMetaData.error}
      helperText={helperText}
      {...TextFieldProps}
      value={form.getFieldValue(formState, fieldKeyPath, '')}
      onChange={handleChange}
      ref={form.registerField(fieldKeyPath, {
        validation: validation
      })}
    />
  );
}