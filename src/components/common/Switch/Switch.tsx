import React, {Ref} from 'react';
import {Switch as RNSwitch, SwitchProps} from 'react-native';
import {useTheme} from '../../../theme';
import {useController} from 'react-hook-form'; //

interface ISwitch extends SwitchProps {
  style?: any;
  control?: any;
  name: string;
  ref?: Ref<any>;
}

const Switch = ({style, control, name, ...props}: ISwitch) => {
  const theme = useTheme();

  const {field} = useController({name, control, defaultValue: ''});

  return (
    <RNSwitch
      trackColor={{false: '#767577', true: '#ff2333'}}
      //thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      value={field.value}
      onValueChange={field.onChange}
      style={[style]}
      {...props}
    />
  );
};

export default Switch;
