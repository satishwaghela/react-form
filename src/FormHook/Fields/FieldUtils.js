import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

export function handleChangeFlow (value, fieldKeyPath, onValueChange, validation, form) {
  const { formState } = form;
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

export function getHelperText (fieldMetaData) {
  if (fieldMetaData.validating) {
    return <FormHelperText>Validating...</FormHelperText>;
  } else if (fieldMetaData.error) {
    return <FormHelperText error>{fieldMetaData.error}</FormHelperText>
  } else {
    return null;
  }
}
