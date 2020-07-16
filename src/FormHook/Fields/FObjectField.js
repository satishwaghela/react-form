import React from 'react';
import PropTypes from 'prop-types';

import { getHelperText, useCall } from './FieldUtils';

export default function FObjectField (props) {
  const { form, fieldKeyPath, validation, Child, ChildProps = {} } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath);

  useCall(() => {
    if (validation) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator();
    }
  }, [value]);

  const validateObject = () => {
    if (validation) {
      form.getLatestFormState((formState) => {
        const object = form.getFieldValue(fieldKeyPath, formState);
        const validator = form.getValidator(fieldKeyPath, object);
        validator();
      });
    }
  };

  const clearObjectError = () => {
    form.setFieldError(fieldKeyPath);
  };

  return (
    <>
      <Child
        {...ChildProps}
        form={form}
        validateObject={validateObject}
        clearObjectError={clearObjectError}
        fieldKeyPath={fieldKeyPath}
      />
      <div
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
      >
        {getHelperText(fieldMetaData)}
      </div>
    </>
  );
}

FObjectField.propTypes = {
  Child: PropTypes.any,
  ChildProps: PropTypes.object,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func
};
