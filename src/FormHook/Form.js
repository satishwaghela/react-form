import { useState, useRef, createRef } from 'react';
import _ from 'lodash';
import produce from 'immer';

export default function useForm ({
  formData = {}, metaData = {}
}) {
  const [state, setState] = useState({
    formData, metaData
  });
  const fields = useRef({});

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
      const newState = produce(prevState, (draftState) => {
        setCallback(draftState);
      });
      return newState;
    });
  };

  const getFieldMetaDataPath = (fieldKeyPath) => {
    return fieldKeyPath.split('.').join('.children.');
  };

  const getFieldMetaData = (fieldKeyPath) => {
    return _.get(state.metaData, getFieldMetaDataPath(fieldKeyPath), {});
  };

  const getFieldValue = (fieldKeyPath, defaultValue) => {
    return _.get(state.formData, fieldKeyPath, defaultValue);
  };

  const setFieldValue = (fieldKeyPath, value) => {
    setFormState((draftState) => {
      _.set(draftState.formData, fieldKeyPath, value);
    });
    setFieldTouched(fieldKeyPath);
    setFieldValidationDone(fieldKeyPath, false);
  };

  const setArrayItemUniqeKeyMeta = (fieldKeyPath) => {
    setFormState((draftState) => {
      const arrayValue = _.get(draftState.formData, fieldKeyPath);
      const arrayMetaData = _.get(draftState.metaData, getFieldMetaDataPath(fieldKeyPath), {});
      const metaItems = arrayMetaData.children || [];
      _.each(arrayValue, (value, index) => {
        const itemMeta = metaItems[index];
        if (!itemMeta || !itemMeta.ukey) {
          const ukey = '_' + Math.random().toString(36).substr(2, 9);
          _.set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath + '.' + index)}.ukey`, ukey);
        }
      });
    });
  }

  const arrayItemAdd = (fieldKeyPath, value) => {
    setFormState((draftState) => {
      let arrayValue = _.get(draftState.formData, fieldKeyPath);
      if (arrayValue) {
        arrayValue.push(value);
      } else {
        arrayValue = [value];
        _.set(draftState.formData, fieldKeyPath, arrayValue);
      }
    });
  };

  const arrayItemRemove = (fieldKeyPath, index) => {
    setFormState((draftState) => {
      const arrayValue = _.get(draftState.formData, fieldKeyPath);
      arrayValue.splice(index, 1);

      const metaData = _.get(draftState.metaData, getFieldMetaDataPath(fieldKeyPath));
      if (metaData && metaData.children) {
        metaData.children.splice(index, 1);
      }
    });
  }

  const getFieldTouched = (fieldKeyPath) => {
    return _.get(state.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.isTouched`, false);
  };

  const setFieldTouched = (fieldKeyPath) => {
    setFormState((draftState) => {
      _.set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.isTouched`, true);
    });
  };

  const getFieldValidationDone = (fieldKeyPath) => {
    return _.get(state.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validationDone`);
  };

  const setFieldValidationDone = (fieldKeyPath, value) => {
    setFormState((draftState) => {
      _.set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validationDone`, value);
    });
  };

  const getFieldError = (fieldKeyPath) => {
    return _.get(state.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.error`);
  };

  const setFieldError = (fieldKeyPath, errorMsg) => {
    setFormState((draftState) => {
      _.set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.error`, errorMsg);
    });
  };

  const getFieldValidating = (fieldKeyPath) => {
    return _.get(state.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validating`, false);
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
    validation(value, state, (error) => {
      updatePostValidationMetaData(fieldKeyPath, error);
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

  const getFormValidity = (callback) => {
    setFormState((draftState) => {
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
        const fieldMetaData = _.get(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}`, {});
        const fieldError = fieldMetaData.error;
        const isFieldValidating = fieldMetaData.validating;
        const isFieldValidationDone = fieldMetaData.validationDone;
        if (isFieldValidating) {
          validity.validatingFields.push(fieldKeyPath);
        } else if (fieldError) {
          validity.invalidFields.push(fieldKeyPath);
        } else if (!isFieldValidationDone) {
          validity.validatingFields.push(fieldKeyPath);
          const value = _.get(draftState.formData, getFieldMetaDataPath(fieldKeyPath));
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
      callback(validity);
    })
  };

  return {
    formState: state,
    fields,
    registerField,
    setFormState,
    getFieldMetaData,
    getFieldValue,
    setFieldValue,
    setArrayItemUniqeKeyMeta,
    arrayItemAdd,
    arrayItemRemove,
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
