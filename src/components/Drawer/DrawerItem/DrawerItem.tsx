import React from 'react';
import {Box, Text} from '../../../theme';
import {TouchableOpacity} from 'react-native';
import Icon from '../../common/Icon/Icon';

interface IDrawerItem {
  label: string;
  screen: string;
  icon: string;
  key: number | string;
  onPress: () => void;
}

const DrawerItem = ({label, screen, onPress, icon}: IDrawerItem) => {
  return (
    <Box key={screen}>
      <TouchableOpacity key={screen} onPress={onPress}>
        <Box flexDirection="row" alignItems="center">
          <Box mr="m">
            <Icon name={icon} size={20} type="MaterialIcon" />
          </Box>
          <Text variant="nav">{label}</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default DrawerItem;
