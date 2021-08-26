import React, {ReactElement, ReactNode, FC} from 'react';
import {ScrollView, SafeAreaView, StyleProp} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Box} from '../../../theme';
import {useScreen} from '../../../hooks/useScreen';

interface IProps {
  children: ReactElement | ReactNode;
  style?: string;
}

const Container: FC<IProps> = ({children, style}: IProps) => {
  const screen = useScreen();
  return (
    <KeyboardAwareScrollView>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <SafeAreaView>
        <Box padding={screen.isSmallDevice ? 's' : 'm'} style={[style]}>
          {children}
        </Box>
      </SafeAreaView>
      {/* </ScrollView> */}
    </KeyboardAwareScrollView>
  );
};

export default Container;
