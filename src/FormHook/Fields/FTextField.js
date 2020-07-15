import React from 'react';
import TextField from '@material-ui/core/TextField';
import { handleChangeFlow, getHelperText } from './FieldUtils';

export default function FTextField(props) {
  const { TextFieldProps, form, fieldKeyPath, validation, onValueChange } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const handleChange = (event) => {
    const value = event.target.value;
    handleChangeFlow(value, fieldKeyPath, onValueChange, validation, form);
  }

  return (
    <>
      <TextField
        error={!fieldMetaData.validating && !!fieldMetaData.error}
        fullWidth
        {...TextFieldProps}
        value={form.getFieldValue(fieldKeyPath, '')}
        onChange={handleChange}
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
      />
      {getHelperText(fieldMetaData)}
    </>
  );
}