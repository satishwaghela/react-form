
export function runValueChangeFlow (value, props) {
  const { form, fieldKeyPath, validations, onValueChange } = props;
  const formState = { ...form.formState };
  form.setFieldValue(formState, fieldKeyPath, value);
  const validationError = form.runValidations(validations, value, formState, props);
  form.setFieldError(formState, fieldKeyPath, validationError);
  if (onValueChange) {
    onValueChange(value, formState);
  }
  form.setFormState(formState);
}
