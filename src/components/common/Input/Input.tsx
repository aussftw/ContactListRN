import React, {ReactElement, ReactNode, Ref} from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {Box, Text, useTheme} from '../../../theme';
import {useController} from 'react-hook-form'; //

interface IInput extends TextInputProps {
  style?: any;
  icon?: ReactElement | ReactNode;
  iconPosistion?: string;
  error?: string;
  label: string;
  control?: any;
  name?: string;
  ref?: Ref<any>;
}

const Input = ({
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
        borderColor={reColor}>
        <Box>{icon && icon}</Box>
        <TextInput
          value={field.value}
          onChangeText={field.onChange}
          style={[style]}
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          maxLength={24}
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
