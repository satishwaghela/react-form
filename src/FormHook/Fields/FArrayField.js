import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getHelperText, useIsMount, MemoField } from './FieldUtils';

export default function FArrayField (props) {
  const { form, fieldKeyPath, validation, Comp, CompProps = {}, ItemComp, ItemCompProps = {}, validateOnChange = true } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    form.setArrayItemUniqeKeyMeta(fieldKeyPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Comp
      {...CompProps}
      form={form}
      fieldKeyPath={fieldKeyPath}
      onRef={form.registerField(fieldKeyPath, {
        validation: validation
      })}
      helperText={getHelperText(fieldMetaData)}
    >
      {(value || []).map((itemValue, i) => {
        const itemFieldKeyPath = `${fieldKeyPath}.${i}`;
        const metaData = form.getFieldMetaData(itemFieldKeyPath);
        return (
          <ItemComp
            key={metaData.ukey || i}
            {...ItemCompProps}
            fieldKeyPath={itemFieldKeyPath}
            arrayFieldKeyPath={fieldKeyPath}
            index={i}
          />
        );
      })}
    </Comp>
  );
}

FArrayField.propTypes = {
  Comp: PropTypes.any,
  CompProps: PropTypes.object,
  ItemComp: PropTypes.any,
  ItemCompProps: PropTypes.object,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validateOnChange: PropTypes.bool,
  validation: PropTypes.func
};

export function MemoFArrayField (props) {
  return (
    <MemoField
      Field={FArrayField}
      props={props}
    />
  );
}
