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
    formData: {
      myKeyValue: [undefined]
    },
    disableBtn: true
  }

  componentDidMount () {
    // this.loadDataForEdit();
  }

  handleSubmit = () => {
    const { formData } = this.state;
    if (this.Form.isValid()) {
      console.log(formData);
    } else {
      this.Form.validate();
      console.log(this.Form.state.errors);
    }
  }

  handleFormChange = (formData, callback) => {
    this.setState({ formData }, () => {
      callback();
      if (this.Form.isValid()) {
        this.setState({ disableBtn: false });
      } else {
        this.setState({ disableBtn: true });
      }
    });
  }

  render () {
    const { formData, disableBtn } = this.state;
    return (
      <div className='App'>
        <div className='row'>
          <div className='col-md-10 offset-md-1'>
            <h3 className='component-header'>Form Example</h3>
            <Form formData={formData} ref={ref => { this.Form = ref; }} onChange={this.handleFormChange}>
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
                <div className='col-md-6' />
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
            {JSON.stringify(formData, null, '    ')}
          </div>
        </div>
      </div>
    );
  }

  loadDataForEdit () {
    setTimeout(() => {
      this.setState({
        formData: {
          myKeyValue: [
            {
              key: 'a',
              value: 'a'
            }
          ],
          profile: {
            firstname: 'satish'
          },
          email: 'satish@sed.vom',
          password: 'sdfa',
          textArea: 'sdf',
          group: [
            'admin',
            'editors'
          ],
          language: [
            'en-us'
          ],
          sports: [
            'football'
          ],
          keyValue: [
            {
              key: 'a',
              value: '1'
            },
            {
              key: 'a',
              value: '4'
            }
          ],
          fourValues: {
            value1: 'a',
            value2: 'a',
            value3: 'a',
            value4: 'a'
          },
          async: {
            multi: [
              'orange'
            ],
            select: 'orange'
          },
          sex: 'M',
          switch: true
        }
      });
    }, 3000);
  }
}
