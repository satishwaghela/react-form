import React from 'react';
import Form from '../form';
const {
  String
} = Form.Fields;

const FixedFourValuesExample = () => {
  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          <label>Four Values * </label>
        </div>
        <div className='col-md-6'>
          <String
            fieldKeyPath='fourValues.value1'
            validation={['required']}
            attrs={{
              placeholder: 'Enter value 1'
            }}
          />
        </div>
        <div className='col-md-6'>
          <String
            fieldKeyPath='fourValues.value2'
            validation={['required']}
            attrs={{
              placeholder: 'Enter value 2'
            }}
          />
        </div>
        <div className='col-md-6'>
          <String
            fieldKeyPath='fourValues.value3'
            validation={['required']}
            attrs={{
              placeholder: 'Enter value 3'
            }}
          />
        </div>
        <div className='col-md-6'>
          <String
            fieldKeyPath='fourValues.value4'
            validation={['required']}
            attrs={{
              placeholder: 'Enter value 4'
            }}
          />
        </div>
      </div>
    </>
  );
}

export default FixedFourValuesExample;
