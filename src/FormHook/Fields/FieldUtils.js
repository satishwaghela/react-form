import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

export function handleChangeFlow (value, fieldKeyPath, onValueChange, validation, form) {
  form.setFormState((draftState) => {
    form.setFieldValue(draftState, fieldKeyPath, value);
  });
  if (onValueChange) {
    onValueChange(value);
  }
  if (validation) {
    const validator = form.getValidator(fieldKeyPath, value);
    validator();
  }
}

export function getHelperText (fieldMetaData) {
  if (fieldMetaData.validating) {
    return <FormHelperText>Validating...</FormHelperText>;
  } else if (fieldMetaData.error) {
    return <FormHelperText error>{fieldMetaData.error}</FormHelperText>;
  } else {
    return null;
  }
}
