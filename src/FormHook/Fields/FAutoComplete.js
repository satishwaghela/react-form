import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getHelperText, useIsMount, MemoField } from './FieldUtils';

export default function FAutoComplete (props) {
  const {
    AutocompleteProps = {}, TextFieldProps = {},
    form, fieldKeyPath, validation,
    valueKey = 'value'
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const { multiple, options } = AutocompleteProps;

  const handleChange = (event, selected) => {
    let value;
    if (multiple) {
      value = selected.map(option => _.get(option, valueKey));
    } else {
      value = _.get(selected, valueKey);
    }
    form.setFieldValue(fieldKeyPath, value);
  };

  let emptyValue;
  if (multiple) {
    emptyValue = [];
  } else {
    emptyValue = '';
  }

  const value = form.getFieldValue(fieldKeyPath, emptyValue);

  const isMount = useIsMount();
  useEffect(() => {
    if (validation && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.length]);

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

FAutoComplete.propTypes = {
  AutocompleteProps: PropTypes.object,
  TextFieldProps: PropTypes.object,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  valueKey: PropTypes.string
};

export function MemoFAutoComplete (props) {
  return (
    <MemoField
      Field={FAutoComplete}
      props={props}
    />
  );
}
