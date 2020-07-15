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

  const setFormState = (setCallback) => {
    setState((prevState) => {
      const draftState = { ...prevState };
      setCallback(draftState);
      return draftState;
    });
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
    setFieldValidationDone(formState, fieldKeyPath, false);
    hasFormChanged.current = true;
  };

  const getFieldTouched = (formState, fieldKeyPath) => {
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.isTouched`, false);
  };

  const setFieldTouched = (formState, fieldKeyPath) => {
    _.set(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.isTouched`, true);
  };

  const getFieldValidationDone = (formState, fieldKeyPath) => {
    return _.get(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validationDone`);
  };

  const setFieldValidationDone = (formState, fieldKeyPath, value) => {
    _.set(formState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validationDone`, value);
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

  const getFieldValidation = (fieldKeyPath) => {
    return fields.current[fieldKeyPath].validation;
  };

  const updatePreValidationMetaData = (value, formState, fieldKeyPath) => {
    setFieldValidating(formState, fieldKeyPath, true);
  };

  const updatePostValidationMetaData = (error, formState, fieldKeyPath) => {
    setFieldError(formState, fieldKeyPath, error);
    setFieldValidating(formState, fieldKeyPath, false);
    setFieldValidationDone(formState, fieldKeyPath, true);
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
    setFormState((draftState) => {
      updatePreValidationMetaData(value, draftState, fieldKeyPath);
      validation(value, draftState, (error) => {
        setFormState((draftState) => {
          updatePostValidationMetaData(error, draftState, fieldKeyPath);
        });
      });
    });
  };

  const validateForm = () => {
    setFormState((draftState) => {
      _.each(fields.current, (field, fieldKeyPath) => {
        if (!field.fieldRef || !field.fieldRef.current || !field.validation) {
          return;
        }
        const isFieldTouched = getFieldTouched(state, fieldKeyPath);
        const fieldError = getFieldError(state, fieldKeyPath);
        const isFieldValidating = getFieldValidating(state, fieldKeyPath);
        const isFieldValidationDone = getFieldValidationDone(state, fieldKeyPath);
        if (!isFieldTouched && !fieldError && !isFieldValidating && !isFieldValidationDone) {
          const value = getFieldValue(draftState, fieldKeyPath);
          const validator = getValidator(fieldKeyPath, value);
          validator();
        }
      });
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
      const fieldError = getFieldError(state, fieldKeyPath);
      const isFieldValidating = getFieldValidating(state, fieldKeyPath);
      const isFieldValidationDone = getFieldValidationDone(state, fieldKeyPath);
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
