import React from 'react';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { handleChangeFlow, getHelperText } from './FieldUtils';

export default function FTextField (props) {
  const {
    AutocompleteProps = {}, TextFieldProps = {},
    form, fieldKeyPath, validation, onValueChange,
    valueKey = 'value'
  } = props;
  const { formState } = form;
  const fieldMetaData = form.getFieldMetaData(formState, fieldKeyPath);

  const { multiple, options } = AutocompleteProps;

  const handleChange = (event, selected) => {
    let value;
    if (multiple) {
      value = selected.map(option => _.get(option, valueKey));
    } else {
      value = _.get(selected, valueKey);
    }
    handleChangeFlow(value, fieldKeyPath, onValueChange, validation, form);
  };

  let emptyValue;
  if (multiple) {
    emptyValue = [];
  } else {
    emptyValue = '';
  }

  const value = form.getFieldValue(formState, fieldKeyPath, emptyValue);

  let selected;
  if (multiple) {
    selected = options.filter(option => {
      const optionValue = _.get(option, valueKey);
      return value.includes(optionValue);
    });
  } else {
    selected = options.find(option => {
      const optionValue = _.get(option, valueKey);
      return value === optionValue;
    });
  }

  return (
    <>
      <Autocomplete
        fullWidth
        value={selected}
        {...AutocompleteProps}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} {...TextFieldProps} />}
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
      />
      {getHelperText(fieldMetaData)}
    </>
  );
}
