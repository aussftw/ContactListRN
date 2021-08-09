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
      trackColor={{false: theme.colors.darkGrey, true: theme.colors.primary}}
      ios_backgroundColor={theme.colors.darkGrey}
      value={field.value}
      onValueChange={field.onChange}
      style={[style]}
      {...props}
    />
  );
};

export default Switch;
