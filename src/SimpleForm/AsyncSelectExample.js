import React from 'react';
import Form from '../form';
const {
  AsyncSelect,
  AsyncMultiSelect
} = Form.Fields;

function abortableFetch(request, opts = {}) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    ready: fetch(request, { ...opts, signal })
  };
}

let abortableFetchRequest;

const promiseOptions = (inputValue) => {
  if (abortableFetchRequest) {
    abortableFetchRequest.abort();
  }
  abortableFetchRequest = abortableFetch('/')
  const request = abortableFetchRequest.ready.then(res => {
    return [{
      label: 'orange',
      value: 'orange'
    }, {
      label: 'yellow',
      value: 'yellow'
    }, {
      label: 'forest',
      value: 'forest'
    }]
  });
  return request;
}

const AsyncSelectExample = () => {
  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          <div className='row'>
            <div className='col-md-6'>
              <AsyncSelect
                label='Async Select'
                fieldKeyPath='async.select'
                validation={['required']}
                promiseOptions={promiseOptions}
                attrs={{ options: [] }}
              />
            </div>
            <div className='col-md-6'>
              <AsyncMultiSelect
                label='Async Multi Select'
                fieldKeyPath='async.multi'
                validation={['required']}
                promiseOptions={promiseOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AsyncSelectExample;
