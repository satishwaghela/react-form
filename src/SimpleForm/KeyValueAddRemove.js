import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Form from '../form';
const { String } = Form.Fields;

export default class KeyValueAddRemove extends Component {
  getForm () {
    return _.get(this, 'context.Form');
  }

  getValueArr () {
    const { fieldKeyBasePath } = this.props;
    return _.get(this, `context.Form.state.FormData.${fieldKeyBasePath}`, []);
  }

  setValueArr (valueArr) {
    const { fieldKeyBasePath } = this.props;
    return _.set(this, `context.Form.state.FormData.${fieldKeyBasePath}`, valueArr);
  }

  getErrorArr () {
    const { fieldKeyBasePath } = this.props;
    return _.get(this, `context.Form.state.Errors.${fieldKeyBasePath}`, []);
  }

  setErrorArr (errorArr) {
    const { fieldKeyBasePath } = this.props;
    return _.set(this, `context.Form.state.Errors.${fieldKeyBasePath}`, errorArr);
  }

  handleAdd =  () => {
    const valueArr = this.getValueArr();
    valueArr.push(undefined);
    this.setValueArr(valueArr);
    const Form = this.getForm();
    Form.forceUpdate();
    Form.onFieldValueChange();
  }

  handleRemove = (index) => {
    const valueArr = this.getValueArr();
    const errorArr = this.getErrorArr();
    valueArr.splice(index, 1);
    errorArr.splice(index, 1);
    this.setValueArr(valueArr);
    this.setErrorArr(errorArr);
    const Form = this.getForm();
    Form.forceUpdate();
    Form.onFieldValueChange();
  }

  render () {
    const { fieldKeyBasePath } = this.props;
    const valueArr = this.getValueArr();
    return (
      <>
        <div className='row'>
          <div className='col-md-5'>Key *</div>
          <div className='col-md-5'>Value *</div>
        </div>
        {_.map(valueArr, (v, i) => {
          return (
            <div className='row'>
              <div className='col-md-5'>
                <String
                  fieldKeyPath={`${fieldKeyBasePath}.${i}.key`}
                  validation={['required']}
                />
              </div>
              <div className='col-md-5'>
                <String
                  fieldKeyPath={`${fieldKeyBasePath}.${i}.value`}
                  validation={['required']}
                />
              </div>
              <div className='col-md-2'>
                <button onClick={() => this.handleRemove(i)}>Remove</button>
              </div>
            </div>
          );
        })}
        <button onClick={this.handleAdd}>Add</button>
      </>
    )
  }
}

KeyValueAddRemove.contextTypes = {
  Form: PropTypes.object
};
