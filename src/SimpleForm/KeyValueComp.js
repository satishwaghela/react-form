import React from 'react';
import { String } from '../form/Fields';

export default function KeyValueComp ({ baseFieldKeyPath, onRemove }) {
  return (
    <div className='row'>
      <div className='col-md-5'>
        <String
          fieldKeyPath={`${baseFieldKeyPath}.key`}
          validation={['required']}
        />
      </div>
      <div className='col-md-5'>
        <String
          fieldKeyPath={`${baseFieldKeyPath}.value`}
          validation={['required']}
        />
      </div>
      <div className='col-md-2'>
        <button onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
}