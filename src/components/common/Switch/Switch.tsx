import React, {Ref, FC} from 'react';
import {Switch as RNSwitch} from 'react-native';
import {useTheme} from '../../../theme';
import {useController, UseControllerProps} from 'react-hook-form'; //
interface ISwitch extends UseControllerProps {
  style?: any;
  name: string;
  ref?: Ref<any>;
}

const Switch: FC<ISwitch> = ({style, control, name, ...props}: ISwitch) => {
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
