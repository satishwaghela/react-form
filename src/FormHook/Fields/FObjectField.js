import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getHelperText, useIsMount } from './FieldUtils';

export default function FObjectField (props) {
  const { form, fieldKeyPath, validation, Comp, CompProps = {} } = props;
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
    <Comp
      {...CompProps}
      form={form}
      fieldKeyPath={fieldKeyPath}
      ref={form.registerField(fieldKeyPath, {
        validation: validation
      })}
      helperText={getHelperText(fieldMetaData)}
    />
  );
}

FObjectField.propTypes = {
  Comp: PropTypes.any,
  CompProps: PropTypes.object,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func
};
