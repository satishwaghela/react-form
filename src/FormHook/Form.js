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

  const registerField = (fieldKeyPath, options = {}) => {
    const ref = createRef();
    fields.current[fieldKeyPath] = {
      fieldRef: ref,
      ...options
    };
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

  const getValidator = (formState, fieldKeyPath, value) => {
    const validation = fields.current[fieldKeyPath].validation;
    if (!validation) {
      return () => { console.error(`No validation defined for field ${fieldKeyPath}`) }
    }
    return () => {
      runValidation(validation, value, formState, fieldKeyPath);
    }
  }

  const runValidation = (validation, value, formState, fieldKeyPath) => {
    setFieldError(formState, fieldKeyPath);
    setFieldValidating(formState, fieldKeyPath, true);
    validation(value, formState, (error) => {
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
      if (!field.fieldRef || !field.fieldRef.current || !field.validation) {
        return;
      }
      const value = getFieldValue(formState, fieldKeyPath);
      const validator = getValidator(formState, fieldKeyPath, value);
      validator();
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
      if (!field.fieldRef || !field.fieldRef.current || !field.validation) {
        return;
      }
      validity.validatingFields.push(fieldKeyPath);
      const value = getFieldValue(state, fieldKeyPath);
      field.validation(value, state, (error) => {
        const index = validity.validatingFields.indexOf(fieldKeyPath);
        validity.validatingFields.splice(index, 1);
        if (error) {
          validity.invalidFields.push(fieldKeyPath);
        } else {
          validity.validFields.push(fieldKeyPath);
        }
      });
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
    getValidator,
    runValidation,
    getFieldValidating,
    setFieldValidating,
    getFormValidity,
    validateForm
  };
}
