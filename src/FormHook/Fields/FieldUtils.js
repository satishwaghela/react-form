
export function runValueChangeFlow (value, props) {
  const { form, fieldKeyPath, validation, onValueChange } = props;
  const formState = { ...form.formState };
  form.setFieldValue(formState, fieldKeyPath, value);
  form.runValidation(validation, value, formState, props);
  if (onValueChange) {
    onValueChange(value, formState);
  }
  form.setFormState(formState);
}
