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
    valueKey, validateOnChange = true
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const { multiple, options } = AutocompleteProps;

  const value = form.getFieldValue(fieldKeyPath);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event, selected) => {
    let value;
    if (valueKey) {
      if (multiple) {
        value = selected.map(option => _.get(option, valueKey));
      } else {
        value = _.get(selected, valueKey);
      }
    } else {
      value = selected;
    }
    form.setFieldValue(fieldKeyPath, value);
  };

  let selected;
  if (valueKey) {
    let emptyValue;
    if (multiple) {
      emptyValue = [];
    } else {
      emptyValue = '';
    }
    const _value = value || emptyValue;
    if (multiple) {
      selected = options.filter(option => {
        const optionValue = _.get(option, valueKey);
        return _value.includes(optionValue);
      });
    } else {
      selected = options.find(option => {
        const optionValue = _.get(option, valueKey);
        return _value === optionValue;
      });
    }
  } else {
    selected = value;
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
  validateOnChange: PropTypes.bool,
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
