import React from 'react';
import Form from '../form';
const {
  String,
  Number
} = Form.Fields;

const FixedKeyValue = () => {
  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          <div className='row'>
            <div className='col-md-6'>
              <label>Key *</label>
              <String
                fieldKeyPath='keyValue.0.key'
                validation={['required']}
              />
            </div>
            <div className='col-md-6'>
              <label>Value *</label>
              <Number
                fieldKeyPath='keyValue.0.value'
                validation={['required', 'number_min', 'number_max']}
                attrs={{
                  min: 1,
                  max: 10
                }}
              />
            </div>
          </div>
        </div>
        <div className='col-md-12'>
          <div className='row'>
            <div className='col-md-6'>
              <String
                fieldKeyPath='keyValue.1.key'
                validation={['required']}
              />
            </div>
            <div className='col-md-6'>
              <Number
                fieldKeyPath='keyValue.1.value'
                validation={['required', 'number_min', 'number_max']}
                attrs={{
                  min: 1,
                  max: 5
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FixedKeyValue;
