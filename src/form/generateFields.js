import React from 'react';
import _ from 'lodash';
import {
  String, Select, CreatableSelect, MultiSelect, CreatableMultiSelect
} from './Fields';

function getFields () {
  return {
    string: String,
    select: Select,
    multi_select: MultiSelect,
    creatable_select: CreatableSelect,
    creatable_multi_select: CreatableMultiSelect
  };
}

const generateFields = (fieldArray, data = {}, fieldPath = []) => {
  const components = _.map(fieldArray, (field) => {
    const { type, attributeName, label } = field;
    const FieldComponent = getFields()[type];
    const valuePath = [...fieldPath, attributeName].join('.');
    return (
      <FieldComponent
        attrs={{ ...field }}
        value={attributeName}
        valuePath={valuePath}
        label={label}
        data={data}
        validation={field.validation}
        fieldInfo={field.fieldInfo}
        field={field}
      />
    );
  });
  return components;
};

export default generateFields;
