import React from 'react';
import {Box, Text} from '../../theme';
import {TouchableOpacity, ScrollView} from 'react-native';
import {ISettingOption} from '../../types/settingOption';
import {Modal, Icon} from '../common/';

interface ISettings {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  prefOptions: any;
  settingsOptions: any;
}

const SettingsView = ({
  settingsOptions,
  modalVisible,
  setModalVisible,
  prefOptions,
}: ISettings) => {
  return (
    <>
      <Modal
        modalVisible={modalVisible}
        setModalVisble={setModalVisible}
        modalHeader={true}
        closeOnTouchOutSide={false}
        title="Sort order"
        transparent>
        <Box mt="xl">
          {prefOptions.map(({name, selected, onPress}, index) => (
            <TouchableOpacity key={name + index} onPress={onPress}>
              <Box flexDirection="row" alignItems="center">
                <Text variant="nav" color="secondary" mr="s">
                  {name}
                </Text>
                {selected && (
                  <Icon name="check" type="MaterialIcon" size={30} />
                )}
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </Modal>
      <ScrollView>
        <Box>
          {settingsOptions.map(
            ({onPress, title, subTitle}: ISettingOption, index: number) => (
              <TouchableOpacity onPress={onPress} key={title + index}>
                <Box>
                  <Box marginHorizontal="m" marginVertical="m">
                    <Text variant="nav" color="secondary">
                      {title}
                    </Text>
                    {subTitle ? (
                      <Text variant="body" color="secondary" opacity={0.6}>
                        {subTitle}
                      </Text>
                    ) : null}
                  </Box>
                  <Box height={0.5} backgroundColor="darkGrey" />
                </Box>
              </TouchableOpacity>
            ),
          )}
        </Box>
      </ScrollView>
    </>
  );
};

export default SettingsView;
