import React from 'react';
import { CheckBox } from './CheckBox';
import { getFieldPopover } from '../FormUtils';
import { SwitchInput } from './SwitchInput';

export class Switch extends CheckBox {
  getField = () => {
    const {
      info, fieldKeyPath,
      switchWidth, onText, offText, className
    } = this.props;

    const checked = this.getValue(fieldKeyPath, false);

    const switchComp = (
      <SwitchInput
        className={className}
        switchWidth={switchWidth}
        onText={onText}
        offText={offText}
        checked={checked}
        id={fieldKeyPath}
        onChange={e => this.handleChange(e)}
      />
    );

    return (
      <div>
        {switchComp}
        {info && getFieldPopover(info, fieldKeyPath + 'checkbox')}
      </div>
    );
  }
}
