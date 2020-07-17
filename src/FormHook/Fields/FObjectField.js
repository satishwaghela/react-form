import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getHelperText, useIsMount } from './FieldUtils';

export default function FObjectField (props) {
  const { form, fieldKeyPath, validation, Child, ChildProps = {} } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath);

  const isMount = useIsMount();
  useEffect(() => {
    if (validation && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Child
        {...ChildProps}
        form={form}
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
