import React, {ReactElement, ReactNode} from 'react';
import {Box} from '../../../theme';

import ZocialIcon from 'react-native-vector-icons/Zocial';
import OctionIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5Pro';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface IICON<T> {
  type: string;
  name: T;
  size: number;
  children?: ReactElement | ReactNode;
  color?: string;
}

const getIconType = (type: string) => {
  switch (type) {
    case 'ZocialIcon':
      return ZocialIcon;
    case 'OctionIcon':
      return OctionIcon;
    case 'MaterialIcon':
      return MaterialIcon;
    case 'MaterialCommunityIcon':
      return MaterialCommunityIcon;
    case 'FoundationIcon':
      return FoundationIcon;
    case 'EvilICon':
      return EvilIcon;
    case 'EntypoIcon':
      return EntypoIcon;
    case 'FontAwesomeIcon':
      return FontAwesomeIcon;
    case 'FontAwesomeIcon5':
      return FontAwesomeIcon5;
    case 'SimpleLineIcon':
      return SimpleLineIcon;
    case 'AntDesignIcon':
      return AntDesign;
    case 'FeatherIcon':
      return Feather;
    case 'FontistoIcon':
      return Fontisto;
    default:
      return;
  }
};

const Icon = ({type, ...props}: IICON) => {
  const IconType = getIconType(type);
  return <IconType {...props} />; // ????
  // switch (type) {
  //   case 'ZocialIcon':
  //     return <ZocialIcon {...props} />;
  //   case 'OctionIcon':
  //     return <OctionIcon {...props} />;
  //   case 'MaterialIcon':
  //     return <MaterialIcon {...props} />;
  //   case 'MaterialCommunityIcon':
  //     return <MaterialCommunityIcon {...props} />;
  //   case 'FoundationIcon':
  //     return <FoundationIcon {...props} />;
  //   case 'EvilICon':
  //     return <EvilIcon {...props} />;
  //   case 'EntypoICon':
  //     return <EntypoIcon {...props} />;
  //   case 'FontAwesomeIcon':
  //     return <FontAwesomeIcon {...props} />;
  //   case 'FontAwesomeIcon5':
  //     return <FontAwesomeIcon5 {...props} />;
  //   case 'SimpleLineIcon':
  //     return <SimpleLineIcon {...props} />;
  //   case 'AntDesign':
  //     return <AntDesign {...props} />;
  //   case 'Feather':
  //     return <Feather {...props} />;
  //   case 'Fontisto':
  //     return <Fontisto {...props} />;
  //   default:
  //     return;
  // }
};

export default Icon;
