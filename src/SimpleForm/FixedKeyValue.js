import React from 'react';
import Form from '../form';
const {
  String
} = Form.Fields;

const FixedKeyValue = () => {
  return (
    <>
      <div className='row'>
        <div className='col-md-6'>
          <label>Key *</label>
          <String
            fieldKeyPath='keyValue.0.key'
            validation={['required']}
          />
          <String
            fieldKeyPath='keyValue.1.key'
            validation={['required']}
          />
        </div>
        <div className='col-md-6'>
          <label>Value *</label>
          <String
            fieldKeyPath='keyValue.0.value'
            validation={['required']}
          />
          <String
            fieldKeyPath='keyValue.1.value'
            validation={['required']}
          />
        </div>
      </div>
    </>
  );
}

export default FixedKeyValue;
