import { useState, useRef, createRef } from 'react';
import _ from 'lodash';

export default function useForm ({
  formData = {}, metaData = {}
}) {
  const [state, setState] = useState({
    formData, metaData
  });
  const fields = useRef({});

  const registerField = (fieldKeyPath) => {
    const ref = createRef();
    fields.current[fieldKeyPath] = ref;
    return ref;
  };

  const setFormState = (formState) => {
    setState(formState);
  };

  const getFieldMetaDataPath = (fieldKeyPath) => {
    return fieldKeyPath.split('.').join('.children.');
  };

  const getFieldMetaData = (formState, fieldKeyPath) => {
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}`, {});
  };

  const getFieldValue = (formState, fieldKeyPath, defaultValue) => {
    return _.get(formState.formData, fieldKeyPath, defaultValue);
  };

  const setFieldValue = (formState, fieldKeyPath, value) => {
    _.set(formState.formData, fieldKeyPath, value);
    setFieldTouched(formState, fieldKeyPath);
  };

  const getFieldTouched = (formState, fieldKeyPath) => {
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.isTouched`, false);
  };

  const setFieldTouched = (formState, fieldKeyPath) => {
    _.set(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.isTouched`, true);
  };

  const getFieldError = (formState, fieldKeyPath) => {
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.error`);
  };

  const setFieldError = (formState, fieldKeyPath, errorMsg) => {
    _.set(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.error`, errorMsg);
  };

  const runValidations = (validations, value, formState, fieldProps) => {
    let validationError;
    validations.forEach((validationFunction) => {
      if (!validationError) {
        validationError = validationFunction(value, formState, fieldProps);
      }
    });
    return validationError;
  };

  const getFieldValidating = (formState, fieldKeyPath) => {
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validating`, false);
  };

  const setFieldValidating = (formState, fieldKeyPath, value) => {
    _.set(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validating`, value);
  };

  const validateForm = () => {
    const formState = { ...state };
    _.each(fields.current, (field, fieldKeyPath) => {
      const validationError = field.current.getValidationError();
      setFieldError(formState, fieldKeyPath, validationError);
    });
    setState(formState);
  };

  const getFormValidity = () => {
    let validationError;
    _.each(fields.current, (field) => {
      if (!validationError) {
        validationError = field.current.getValidationError();
      }
    });
    return {
      valid: !validationError
    };
  };

  return {
    formState: state,
    fields,
    registerField,
    setFormState,
    getFieldMetaData,
    getFieldValue,
    setFieldValue,
    getFieldTouched,
    setFieldTouched,
    getFieldError,
    setFieldError,
    runValidations,
    getFieldValidating,
    setFieldValidating,
    getFormValidity,
    validateForm
  };
}
