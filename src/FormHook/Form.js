import { useState, useRef, createRef } from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _each from 'lodash/each';
import produce from 'immer';

export default function useForm ({
  formData = {}, metaData = {}
}) {
  const form = useRef({});

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
    return _get(state.metaData, getFieldMetaDataPath(fieldKeyPath), {});
  };

  const clearFieldMetaData = (fieldKeyPath) => {
    setFormState((draftState) => {
      _set(draftState.metaData, getFieldMetaDataPath(fieldKeyPath), {});
    });
  };

  const deleteFieldProperty = (fieldKeyPath) => {
    setFormState((draftState) => {
      const splitPath = fieldKeyPath.split('.');
      const objectPath = splitPath.slice(0, -1).join('.');
      const fieldKey = splitPath.slice(-1)[0];
      let object;
      if (objectPath) {
        object = _get(draftState.formData, objectPath, {});
      } else {
        object = draftState.formData;
      }
      delete object[fieldKey];
    });
  };

  const getFieldValue = (fieldKeyPath, defaultValue) => {
    return _get(state.formData, fieldKeyPath, defaultValue);
  };

  const setFieldValue = (fieldKeyPath, value) => {
    setFormState((draftState) => {
      _set(draftState.formData, fieldKeyPath, value);
    });
    setFieldValidationDone(fieldKeyPath, false);
  };

  const setArrayItemUniqeKeyMeta = (fieldKeyPath) => {
    setFormState((draftState) => {
      const arrayValue = _get(draftState.formData, fieldKeyPath);
      const arrayMetaData = _get(draftState.metaData, getFieldMetaDataPath(fieldKeyPath), {});
      const metaItems = arrayMetaData.children || [];
      _each(arrayValue, (value, index) => {
        const itemMeta = metaItems[index];
        if (!itemMeta || !itemMeta.ukey) {
          const ukey = '_' + Math.random().toString(36).substr(2, 9);
          _set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath + '.' + index)}.ukey`, ukey);
        }
      });
    });
  }

  const arrayItemAdd = (fieldKeyPath, value) => {
    setFormState((draftState) => {
      let arrayValue = _get(draftState.formData, fieldKeyPath);
      if (arrayValue) {
        arrayValue.push(value);
      } else {
        arrayValue = [value];
        _set(draftState.formData, fieldKeyPath, arrayValue);
      }
    });
  };

  const arrayItemRemove = (fieldKeyPath, index) => {
    setFormState((draftState) => {
      const arrayValue = _get(draftState.formData, fieldKeyPath);
      arrayValue.splice(index, 1);

      const metaData = _get(draftState.metaData, getFieldMetaDataPath(fieldKeyPath));
      if (metaData && metaData.children) {
        metaData.children.splice(index, 1);
      }
    });
  }

  const arrayItemShift = (fieldKeyPath, index, shiftToIndex) => {
    setFormState((draftState) => {
      const arrayValue = _get(draftState.formData, fieldKeyPath);
      const value = arrayValue.splice(index, 1)[0];
      arrayValue.splice(shiftToIndex, 0, value);

      const metaData = _get(draftState.metaData, getFieldMetaDataPath(fieldKeyPath));
      if (metaData && metaData.children) {
        const itemMetaData = metaData.children.splice(index, 1)[0];
        metaData.children.splice(shiftToIndex, 0, itemMetaData);
      }
    });
  }

  const getFieldValidationDone = (fieldKeyPath) => {
    return _get(state.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validationDone`);
  };

  const setFieldValidationDone = (fieldKeyPath, value) => {
    setFormState((draftState) => {
      _set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validationDone`, value);
    });
  };

  const getFieldError = (fieldKeyPath) => {
    return _get(state.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.error`);
  };

  const setFieldError = (fieldKeyPath, errorMsg) => {
    setFormState((draftState) => {
      _set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.error`, errorMsg);
    });
  };

  const getFieldValidating = (fieldKeyPath) => {
    return _get(state.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validating`, false);
  };

  const setFieldValidating = (fieldKeyPath, value) => {
    setFormState((draftState) => {
      _set(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}.validating`, value);
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
      return;
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
    _each(fields.current, (field, fieldKeyPath) => {
      if (!field.fieldRef || !field.fieldRef.current || !field.validation) {
        return;
      }
      const isFieldValidating = getFieldValidating(fieldKeyPath);
      const isFieldValidationDone = getFieldValidationDone(fieldKeyPath);
      if (!isFieldValidating && !isFieldValidationDone) {
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
      _each(fields.current, (field, fieldKeyPath) => {
        if (!field.fieldRef || !field.fieldRef.current || !field.validation) {
          return;
        }
        const fieldMetaData = _get(draftState.metaData, `${getFieldMetaDataPath(fieldKeyPath)}`, {});
        const fieldError = fieldMetaData.error;
        const isFieldValidating = fieldMetaData.validating;
        const isFieldValidationDone = fieldMetaData.validationDone;
        if (isFieldValidating) {
          validity.validatingFields.push(fieldKeyPath);
        } else if (fieldError) {
          validity.invalidFields.push(fieldKeyPath);
        } else if (!isFieldValidationDone) {
          validity.validatingFields.push(fieldKeyPath);
          const value = _get(draftState.formData, fieldKeyPath);
          field.validation(value, state, (error) => {
            const index = validity.validatingFields.indexOf(fieldKeyPath);
            validity.validatingFields.splice(index, 1);
            if (error) {
              validity.invalidFields.push(fieldKeyPath);
            } else {
              validity.validFields.push(fieldKeyPath);
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

  form.current.formState = state;
  form.current.setFormState = setFormState;
  form.current.fields = fields;
  form.current.registerField = registerField;
  form.current.getFieldMetaData = getFieldMetaData;
  form.current.clearFieldMetaData = clearFieldMetaData;
  form.current.deleteFieldProperty = deleteFieldProperty;
  form.current.getFieldValue = getFieldValue;
  form.current.setFieldValue = setFieldValue;
  form.current.setArrayItemUniqeKeyMeta = setArrayItemUniqeKeyMeta;
  form.current.arrayItemAdd = arrayItemAdd;
  form.current.arrayItemRemove = arrayItemRemove;
  form.current.arrayItemShift = arrayItemShift;
  form.current.getFieldError = getFieldError;
  form.current.setFieldError = setFieldError;
  form.current.getFieldValidation = getFieldValidation;
  form.current.updatePreValidationMetaData = updatePreValidationMetaData;
  form.current.updatePostValidationMetaData = updatePostValidationMetaData;
  form.current.getValidator = getValidator;
  form.current.runValidation = runValidation;
  form.current.getFieldValidating = getFieldValidating;
  form.current.setFieldValidating = setFieldValidating;
  form.current.getFormValidity = getFormValidity;
  form.current.validateForm = validateForm;
  return form.current;
}
