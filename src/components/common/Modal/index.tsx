import React, {ReactNode, ReactElement, ReactChild} from 'react';
import {
  Modal as ModalRN,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Box, Text} from '../../../theme';
import {Icon} from '../index';

interface IModal {
  modalVisible: boolean;
  children?: ReactElement | ReactNode | ReactChild;
  setModalVisble: (modalVisible: boolean) => void;
  transparent?: boolean;
  closeOnTouchOutSide: boolean;
  title?: string;
  modalHeader?: boolean;
  height?: any;
}

const Modal = ({
  children,
  modalVisible,
  setModalVisble,
  transparent,
  closeOnTouchOutSide = true,
  modalHeader,
  title,
}: IModal) => {
  return (
    <ModalRN visible={modalVisible} transparent={transparent}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (closeOnTouchOutSide) {
            setModalVisble(false);
          }
        }}>
        <Box
          style={{
            backgroundColor: 'rgba(0,0,0, 0.5)',
          }}
          flex={1} // ???
          //  minHeight={height}
          justifyContent="center">
          <Box
            borderRadius={20}
            backgroundColor="white"
            marginHorizontal="l"
            minHeight={350}
            paddingHorizontal="l">
            {modalHeader && (
              <TouchableOpacity onPress={() => setModalVisble(false)}>
                <Box flexDirection="row" justifyContent="space-between" pt="m">
                  <Text variant="title2">{title}</Text>
                  <Icon name="close" type="MaterialIcon" size={35} />
                </Box>
              </TouchableOpacity>
            )}
            {children}
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </ModalRN>
  );
};

export default Modal;
