import { useState, useEffect, useRef, createRef } from 'react';
import _ from 'lodash';

export default function useForm ({
  formData = {}, metaData = {},
  onFormChange
}) {
  const [state, setState] = useState({
    formData, metaData
  });
  const fields = useRef({});
  const hasFormChanged = useRef(false);

  useEffect(() => {
    if (hasFormChanged.current && onFormChange) {
      onFormChange();
      hasFormChanged.current = false;
    }
  });

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
    hasFormChanged.current = true;
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

  const getFieldValidating = (formState, fieldKeyPath) => {
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validating`, false);
  };

  const setFieldValidating = (formState, fieldKeyPath, value) => {
    _.set(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validating`, value);
  };

  const runValidation = (validation, value, formState, fieldProps) => {
    const { fieldKeyPath } = fieldProps;
    setFieldError(formState, fieldKeyPath);
    setFieldValidating(formState, fieldKeyPath, true);
    validation(value, formState, fieldProps, (error) => {
      const newState = { ...state };
      setFieldError(newState, fieldKeyPath, error);
      setFieldValidating(newState, fieldKeyPath, false);
      hasFormChanged.current = true;
      setFormState(newState);
    });
  };

  const validateForm = () => {
    const formState = { ...state };
    _.each(fields.current, (field, fieldKeyPath) => {
      if (!field.current || !field.current.getValidationError) {
        return;
      }
      const isFieldTouched = getFieldTouched(state, fieldKeyPath);
      const fieldError = getFieldError(state, fieldKeyPath);
      const isFieldValidating = getFieldValidating(state, fieldKeyPath);
      if (!isFieldTouched && !fieldError && !isFieldValidating) {
        setFieldError(formState, fieldKeyPath);
        setFieldValidating(formState, fieldKeyPath, true);
        field.current.getValidationError((error) => {
          const newState = { ...state };
          setFieldError(newState, fieldKeyPath, error);
          setFieldValidating(newState, fieldKeyPath, false);
          setFormState(newState);
        });
      }
    });
    setFormState(formState);
  };

  const getFormValidity = () => {
    const validity = {
      valid: false,
      validFields: [],
      invalidFields: [],
      validatingFields: []
    };
    _.each(fields.current, (field, fieldKeyPath) => {
      if (!field.current || !field.current.getValidationError) {
        return;
      }
      const isFieldTouched = getFieldTouched(state, fieldKeyPath);
      const fieldError = getFieldError(state, fieldKeyPath);
      const isFieldValidating = getFieldValidating(state, fieldKeyPath);
      if (fieldError) {
        validity.invalidFields.push(fieldKeyPath);
      } else if (isFieldValidating) {
        validity.validatingFields.push(fieldKeyPath);
      } else if (!isFieldTouched) {
        validity.validatingFields.push(fieldKeyPath);
        field.current.getValidationError((error) => {
          const index = validity.validatingFields.indexOf(fieldKeyPath);
          validity.validatingFields.splice(index, 1);
          if (error) {
            validity.invalidFields.push(fieldKeyPath);
          }
        });
      } else {
        validity.validFields.push(fieldKeyPath);
      }
    });
    validity.valid = !validity.invalidFields.length && !validity.validatingFields.length;
    return validity;
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
    runValidation,
    getFieldValidating,
    setFieldValidating,
    getFormValidity,
    validateForm
  };
}
