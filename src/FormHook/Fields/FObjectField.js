import React from 'react';

import { getHelperText } from './FieldUtils';

export default function FFObjectField (props) {
  const { form, fieldKeyPath, validation, Child } = props;
  const { formState } = form;
  const fieldMetaData = form.getFieldMetaData(formState, fieldKeyPath);

  const validateObject = (object, newFormState) => {
    if (validation) {
      const validator = form.getValidator(newFormState, fieldKeyPath, object);
      validator();
    }
  }

  const clearObjectError = (newFormState) => {
    form.setFieldError(newFormState, fieldKeyPath);
  }

  return (
    <>
      <Child
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
  )
}