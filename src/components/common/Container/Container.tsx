import React, {ReactElement, ReactNode} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Box} from '../../../theme';

interface IProps {
  children: ReactElement | ReactNode;
  style?: string;
}

const Container = ({children, style}: IProps) => {
  return (
    <KeyboardAwareScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <Box padding="m" style={[style]}>
            {children}
          </Box>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default Container;
