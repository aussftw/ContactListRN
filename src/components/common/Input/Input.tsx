import React, {ReactElement, ReactNode, Ref, FC} from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {Box, Text, useTheme} from '../../../theme';
import {useController, UseControllerProps} from 'react-hook-form'; //

interface IInput extends UseControllerProps {
  style?: {};
  icon?: ReactElement | ReactNode;
  iconPosistion?: string;
  error?: {message: string; required: string} | undefined;
  label: string;
  name: string;
  ref?: Ref<any>;
}

const Input: FC<IInput> = ({
  label,
  style,
  icon,
  error,
  iconPosistion,
  control,
  name,
  ...props
}: IInput) => {
  const theme = useTheme();
  const {field} = useController({name, control, defaultValue: ''});

  const getFlexDirection = () => {
    if (icon && iconPosistion) {
      if (iconPosistion === 'right') {
        return 'row-reverse';
      } else {
        return 'row';
      }
    }
    return 'row';
  };

  const reColor = error?.message ? 'danger' : 'primary';
  const color = theme.colors[reColor];

  console.log(error, 'err');

  return (
    <Box paddingVertical="xs">
      {label && (
        <Text marginBottom="s" color={reColor}>
          {label}
        </Text>
      )}
      <Box
        flexDirection={getFlexDirection()}
        borderWidth={StyleSheet.hairlineWidth}
        height={42}
        justifyContent={
          iconPosistion === 'right' ? 'space-between' : 'flex-start'
        }
        alignItems="center"
        paddingHorizontal="s"
        borderRadius={theme.borderRadiuses.s}
        borderColor={reColor}
        borderBottomWidth={0.7}
        borderTopWidth={0.7}
        borderStartWidth={1}
        borderEndWidth={1}>
        <Box>{icon && icon}</Box>
        <TextInput
          value={field.value}
          onChangeText={field.onChange}
          style={[style]}
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          {...props}
        />
      </Box>

      {error?.message && (
        <Text paddingTop="s" color="danger" textAlign="center">
          {error.message}
        </Text>
      )}
    </Box>
  );
};

export default Input;
