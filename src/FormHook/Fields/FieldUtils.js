import React from 'react';

export function runValueChangeFlow (value, props) {
  const { form, fieldKeyPath, validation, onValueChange } = props;
  const formState = { ...form.formState };
  form.setFieldValue(formState, fieldKeyPath, value);
  validation && form.runValidation(validation, value, formState, props);
  if (onValueChange) {
    onValueChange(value, formState);
  }
  form.setFormState(formState);
}

export function fieldStateComp (metaData) {
  const { error } = metaData;
  return (error && (
    <p className='text-danger field-error'>{error}</p>
  ));
}
