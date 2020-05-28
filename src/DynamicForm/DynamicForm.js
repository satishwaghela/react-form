import React, { Component } from 'react';
import _ from 'lodash';
import Form from '../form';
import ValidationRules from '../form/ValidationRules';
const {
  String,
  AsyncSelect,
  Switch,
  TextArea
} = Form.Fields;

export default class DynamicForm extends Component {
  state = {
    FormData: {},
    disableBtn: true,
  }

  handleTextAreaChange = (e) => {
    const formJSON = e.currentTarget.value;
    this.setState({ formJSON });
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

  getAccessComp () {
    return (
      <div className='row'>
        <div className='col-md-2 text-right'>
          Access Type
        </div>
        <div className='col-md-3'>
          <label>Access</label>
        </div>
      </div>
    );
  }

  getPolicyNameComp () {
    return (
      <div className='row'>
        <div className='col-md-2 text-right'>
          Policy Name *
        </div>
        <div className='col-md-3'>
          <String
            fieldKeyPath='policyName'
            validation={['required']}
          />
        </div>
        <div className='col-md-4'>
          <div className='display-inline-block m-r-sm'>
            <Switch
              fieldKeyPath='enabled'
              onText='Enabled'
              offText='Disabled'
              switchWidth='100px'
            />
          </div>
          <div className='display-inline-block'>
            <Switch
              fieldKeyPath='normal'
              onText='N-Normal'
              offText='Normal'
              switchWidth='100px'
            />
          </div>
        </div>
      </div>
    );
  }

  getPolicyLabelComp () {
    return (
      <div className='row'>
        <div className='col-md-2 text-right'>
          Policy Label
        </div>
        <div className='col-md-3'>
          <String
            fieldKeyPath='policyLabel'
          />
        </div>
      </div>
    );
  }

  getDescriptionComp () {
    return (
      <div className='row'>
        <div className='col-md-2 text-right'>
          Description
        </div>
        <div className='col-md-3'>
          <TextArea
            fieldKeyPath='description'
          />
        </div>
      </div>
    );
  }

  getAutoLoggingComp () {
    return (
      <div className='row'>
        <div className='col-md-2 text-right'>
          Description
        </div>
        <div className='col-md-3'>
          <Switch
            fieldKeyPath='autoLogging'
            onText='Yes'
            offText='No'
            switchWidth='60px'
          />
        </div>
      </div>
    );
  }

  getResourcesComp () {
    const { formJSON } = this.state;
    if (!formJSON) return;

    const json = JSON.parse(formJSON);

    return _.map(json.resources, (field) => {
      const {
        name, label, mandatory,
        excludesSupported, recursiveSupported,
        lookupSupported, validationRegEx, validationMessage
      } = field;
      let fieldRegexValidation;
      if (validationRegEx) {
        fieldRegexValidation = validationRegEx + name;
        ValidationRules[fieldRegexValidation] = (value) => {
          const regex = new RegExp(validationRegEx);
          if (!regex.test(value)) {
            return validationMessage;
          }
        };
      }
      const validation = [];
      if (mandatory) {
        validation.push('required');
      }
      if (validationRegEx) {
        validation.push(fieldRegexValidation);
      }
      return (
        <div className='row'>
          <div className='col-md-2 text-right'>
            {label} {mandatory ? '*' : ''}
          </div>
          <div className='col-md-3'>
            {lookupSupported ? (
              <AsyncSelect
                fieldKeyPath={name}
                validation={validation}
              />
            ) : (
              <String
                fieldKeyPath={name}
                validation={validation}
              />
            )}
          </div>
          <div className='col-md-4'>
            {recursiveSupported && (
              <div className='display-inline-block m-r-sm'>
                <Switch
                  fieldKeyPath={name + 'Recursive'}
                  onText='Recursive'
                  offText='Not Recursive'
                  switchWidth='140px'
                />
              </div>
            )}
            {excludesSupported && (
              <div className='display-inline-block'>
                <Switch
                  fieldKeyPath={name + 'Excluded'}
                  onText='Excluded'
                  offText='Included'
                  switchWidth='100px'
                />
              </div>
            )}
          </div>
        </div>
      );
    });
  }

  render () {
    const { FormData, formJSON } = this.state;
    return (
      <div className='App'>
        <textarea className='form-control' onChange={this.handleTextAreaChange} value={formJSON} />
        <h3 className='component-header'>Dyanmic Form Example</h3>
        <div className='row'>
          <div className='col-md-12'>
            <Form FormData={FormData} ref={ref => this.Form = ref} onChange={this.handleFormChange}>
              {this.getAccessComp()}
              {this.getPolicyNameComp()}
              {this.getPolicyLabelComp()}
              {this.getResourcesComp()}
              {this.getDescriptionComp()}
              {this.getAutoLoggingComp()}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
