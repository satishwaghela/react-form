import React from 'react';
import { CheckBox } from './CheckBox';
import { getFieldPopover } from '../FormUtils';
import { SwitchInput } from './SwitchInput';

export class Switch extends CheckBox {
  getField = () => {
    const {
      info, fieldKeyPath,
      switchWidth, onText, offText
    } = this.props;

    const checked = this.getValue(fieldKeyPath, false);

    const switchComp = (
      <SwitchInput
        switchWidth={switchWidth}
        onText={onText}
        offText={offText}
        checked={checked}
        id={fieldKeyPath}
        onChange={e => this.handleChange(e)}
      />
    );

    return (
      <React.Fragment key='checkbox-comp'>
        <fieldset className='fieldset-default'>
          {switchComp}
        </fieldset>
        {info && getFieldPopover(info, fieldKeyPath + 'checkbox')}
      </React.Fragment>
    );
  }
}
