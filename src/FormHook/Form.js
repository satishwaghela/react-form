import { useState, useEffect, useRef, createRef } from 'react';
import _ from 'lodash';
import produce from 'immer';

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

  const setFormState = (setCallback) => {
    setState((prevState) => {
      const draftState = { ...prevState };
      setCallback(draftState);
      return draftState;
    });
  };

  const getLatestFormState = (callback) => {
    setState((prevState) => {
      callback(prevState);
      return prevState;
    });
  };

  const getFieldMetaDataPath = (fieldKeyPath) => {
    return fieldKeyPath.split('.').join('.children.');
  };

  const getFieldMetaData = (fieldKeyPath, _formState) => {
    const formState = _formState || state;
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}`, {});
  };

  const getFieldValue = (fieldKeyPath, defaultValue, _formState) => {
    const formState = _formState || state;
    return _.get(formState.formData, fieldKeyPath, defaultValue);
  };

  const setFieldValue = (fieldKeyPath, value) => {
    setFormState((draftState) => {
      _.set(draftState.formData, fieldKeyPath, value);
    });
    setFieldTouched(fieldKeyPath);
    setFieldValidationDone(fieldKeyPath, false);
    hasFormChanged.current = true;
  };

  const getFieldTouched = (fieldKeyPath, _formState) => {
    const formState = _formState || state;
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.isTouched`, false);
  };

  const setFieldTouched = (fieldKeyPath) => {
    setFormState((draftState) => {
      _.set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.isTouched`, true);
    });
  };

  const getFieldValidationDone = (fieldKeyPath, _formState) => {
    const formState = _formState || state;
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validationDone`);
  };

  const setFieldValidationDone = (fieldKeyPath, value) => {
    setFormState((draftState) => {
      _.set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validationDone`, value);
    });
  };

  const getFieldError = (fieldKeyPath, _formState) => {
    const formState = _formState || state;
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.error`);
  };

  const setFieldError = (fieldKeyPath, errorMsg) => {
    setFormState((draftState) => {
      _.set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.error`, errorMsg);
    });
  };

  const getFieldValidating = (fieldKeyPath, _formState) => {
    const formState = _formState || state;
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validating`, false);
  };

  const setFieldValidating = (fieldKeyPath, value) => {
    setFormState((draftState) => {
      _.set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validating`, value);
    });
  };

  const getFieldValidation = (fieldKeyPath) => {
    return fields.current[fieldKeyPath].validation;
  };

  const updatePreValidationMetaData = (fieldKeyPath) => {
    setFieldValidating(fieldKeyPath, true);
  };

  const updatePostValidationMetaData = (fieldKeyPath, error) => {
    setFieldError(fieldKeyPath, error);
    setFieldValidating(fieldKeyPath, false);
    setFieldValidationDone(fieldKeyPath, true);
    hasFormChanged.current = true;
  };

  const getValidator = (fieldKeyPath, value) => {
    const validation = getFieldValidation(fieldKeyPath);
    if (!validation) {
      return () => { console.info(`No validation defined for field ${fieldKeyPath}`); };
    }
    return () => {
      runValidation(validation, value, fieldKeyPath);
    };
  };

  const runValidation = (validation, value, fieldKeyPath) => {
    updatePreValidationMetaData(fieldKeyPath);
    getLatestFormState((draftState) => {
      validation(value, draftState, (error) => {
        updatePostValidationMetaData(fieldKeyPath, error);
      });
    });
  };

  const validateForm = () => {
    _.each(fields.current, (field, fieldKeyPath) => {
      if (!field.fieldRef || !field.fieldRef.current || !field.validation) {
        return;
      }
      const isFieldTouched = getFieldTouched(fieldKeyPath);
      const fieldError = getFieldError(fieldKeyPath);
      const isFieldValidating = getFieldValidating(fieldKeyPath);
      const isFieldValidationDone = getFieldValidationDone(fieldKeyPath);
      if (!isFieldTouched && !fieldError && !isFieldValidating && !isFieldValidationDone) {
        const value = getFieldValue(fieldKeyPath);
        const validator = getValidator(fieldKeyPath, value);
        validator();
      }
    });
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
      const fieldError = getFieldError(fieldKeyPath);
      const isFieldValidating = getFieldValidating(fieldKeyPath);
      const isFieldValidationDone = getFieldValidationDone(fieldKeyPath);
      if (isFieldValidating) {
        validity.validatingFields.push(fieldKeyPath);
      } else if (fieldError) {
        validity.invalidFields.push(fieldKeyPath);
      } else if (!isFieldValidationDone) {
        validity.validatingFields.push(fieldKeyPath);
        const value = getFieldValue(state, fieldKeyPath);
        field.validation(value, state, (error) => {
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
    getLatestFormState,
    getFieldMetaData,
    getFieldValue,
    setFieldValue,
    getFieldTouched,
    setFieldTouched,
    getFieldError,
    setFieldError,
    getFieldValidation,
    updatePreValidationMetaData,
    updatePostValidationMetaData,
    getValidator,
    runValidation,
    getFieldValidating,
    setFieldValidating,
    getFormValidity,
    validateForm
  };
}
