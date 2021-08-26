import React, {ReactNode, ReactElement} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {Box, Text, useTheme} from '../../../theme';

interface IButton {
  label?: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  height: number;
  width?: number;
  icon?: ReactElement | ReactNode;
}

const Button: React.FC<IButton> = ({
  label,
  onPress,
  height,
  width,
  disabled,
  loading,
  icon,
}: IButton) => {
  const theme = useTheme();
  const getBackGroundColor = () => {
    if (disabled) {
      return 'grey';
    } else {
      return 'primary';
    }
  };

  return (
    <TouchableOpacity {...{onPress}} disabled={disabled}>
      <Box
        {...{height, width}}
        borderRadius={icon ? theme.borderRadiuses.xl : theme.borderRadiuses.s}
        backgroundColor={getBackGroundColor()}
        alignItems="center"
        justifyContent="space-evenly">
        <Box flexDirection="row" alignItems="center">
          {loading && (
            <Box marginRight="s">
              <ActivityIndicator color="secondary" />
            </Box>
          )}
          {label && <Text color={disabled ? 'black' : 'white'}>{label}</Text>}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
