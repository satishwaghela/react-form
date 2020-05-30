import React, { Component } from 'react';
import Form from '../form';
import PersonalInfoInputs from './PersonalInfoInputs';
import OtherInputs from './OtherInputs';
import FixedKeyValue from './FixedKeyValue';
import FixedFourValuesExample from './FixedFourValuesExample';
import AsyncSelectExample from './AsyncSelectExample';
import KeyValueAddRemove from './KeyValueAddRemove';

export default class SimpleForm extends Component {
  state = {
    FormData: {
      myKeyValue: [undefined]
    },
    disableBtn: true
  }

  handleSubmit = () => {
    if (this.Form.isValid()) {
      console.log(this.Form.state.FormData);
    } else {
      this.Form.validate();
      console.log(this.Form.state.Errors);
    }
  }

  handleFormChange = () => {
    if (this.Form.isValid()) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  }

  render () {
    const { FormData, disableBtn } = this.state;
    return (
      <div className='App'>
        <div className='row'>
          <div className='col-md-10 offset-md-1'>
            <h3 className='component-header'>Form Example</h3>
            <Form FormData={FormData} ref={ref => this.Form = ref} onChange={this.handleFormChange}>
              <PersonalInfoInputs />
              <OtherInputs />
              <div className='row'>
                <div className='col-md-6'>
                  <FixedKeyValue />
                </div>
                <div className='col-md-6'>
                  <FixedFourValuesExample />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <AsyncSelectExample />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                </div>
                <div className='col-md-6'>
                  <KeyValueAddRemove
                    fieldKeyBasePath='myKeyValue'
                  />
                </div>
              </div>
            </Form>
            <button
              type='button'
              onClick={this.handleSubmit}
              className={`btn btn-success ${disableBtn ? 'disable' : ''}`}
            >
              Submit
            </button>
            </div>
        </div>
        <div className='row'>
          <div className='col-md-10 offset-md-1 form-data'>
            <h3 className='component-header'>Form Data</h3>
            {JSON.stringify(FormData, null, '    ')}
          </div>
        </div>
      </div>
    );
  }
}
