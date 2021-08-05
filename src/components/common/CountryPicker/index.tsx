import React, {useState} from 'react';

import {Box, Text} from '../../../theme';
import {Modal, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import Icon from '../Icon/Icon';
import {codesCountryList as data} from '../../../constants/countryCodes';

interface Props {
  code: string;
  setCountryCode: (code: string) => void;
}

const CountryPicker = ({code, setCountryCode}: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const renderItem = (item: any) => (
    <Box>
      <Box flexDirection="row" marginVertical="m">
        <TouchableOpacity
          onPress={() => {
            setCountryCode(item.item);
            setModalVisible(false);
          }}>
          <Text variant="title1">
            {item.item.dial_code} {item.item.name}
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );

  return (
    <Box>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Text>{code}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        //  transparent={true}
        modalVisible={modalVisible}
        setModalVisble={setModalVisible}
        visible={modalVisible}
        onRequestClose={() => {
          console.log(modalVisible), setModalVisible(!modalVisible);
        }}>
        <Box
          flex={1}
          marginTop="l"
          borderTopLeftRadius={35}
          borderTopRightRadius={35}>
          <SafeAreaView>
            <Box height={50} backgroundColor="danger" />
            <Box ml="s">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Box p="s">
                  <Icon
                    type="MaterialIcon"
                    name="close"
                    size={35}
                    color="grey"
                  />
                </Box>
              </TouchableOpacity>
            </Box>
            <Box margin="m">
              <FlatList
                renderItem={renderItem}
                keyExtractor={item => String(item.code)}
                data={data}
                ItemSeparatorComponent={() => (
                  <Box height={2} backgroundColor="secondary" />
                )}
                ListFooterComponent={<Box height={100} />}
              />
            </Box>
          </SafeAreaView>
        </Box>
      </Modal>
    </Box>
  );
};

export default CountryPicker;
