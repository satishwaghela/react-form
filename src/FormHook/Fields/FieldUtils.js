import React, { useRef, useEffect } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

export function handleChangeFlow (value, fieldKeyPath, onValueChange, validation, form) {
  form.setFieldValue(fieldKeyPath, value);
  if (onValueChange) {
    onValueChange(value);
  }
  if (validation) {
    const validator = form.getValidator(fieldKeyPath, value);
    validator();
  }
}

export function useCall (callback, dependencies = []) {
  const prevDependencies = useRef(dependencies);
  useEffect(() => {
    for (let i = 0; i < dependencies.length; i++) {
      if (dependencies[i] !== prevDependencies.current[i]) {
        callback();
        prevDependencies.current = dependencies;
        break;
      }
    }
  });
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
