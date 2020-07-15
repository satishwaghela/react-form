import React from 'react';

import { getHelperText } from './FieldUtils';

export default function FObjectField (props) {
  const { form, fieldKeyPath, validation, Child, ChildProps = {} } = props;
  const { formState } = form;
  const fieldMetaData = form.getFieldMetaData(formState, fieldKeyPath);

  const validateObject = () => {
    if (validation) {
      form.getLatestFormState((formState) => {
        const object = form.getFieldValue(formState, fieldKeyPath);
        const validator = form.getValidator(fieldKeyPath, object);
        validator();
      });
    }
  };

  const clearObjectError = (newFormState) => {
    form.setFieldError(newFormState, fieldKeyPath);
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
