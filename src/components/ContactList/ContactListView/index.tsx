import React, {useState} from 'react';
import Modal from '../../common/Modal/index';
import {Box, Text, theme} from '../../../theme';
import Icon from '../../common/Icon/Icon';
import EmptyContactList from './EmptyContactList';
import Contact from './Contact';
import {IContact} from '../../../types/contact';
import {useNavigation} from '@react-navigation/native';
import {CREATE_CONTACT} from '../../../constants/routeNames';
import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';

interface IContactListView {
  data: any;
  loading: boolean;
  order: string | null;
}

const ConctactListView = ({data, loading, order}: IContactListView) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const renderItem = (item: IContact) => <Contact item={item} />;

  return (
    <>
      <Modal
        transparent
        modalHeader={true}
        title={'RN Contacts'}
        modalVisible={modalVisible}
        setModalVisble={setModalVisible}
        closeOnTouchOutSide={false}
      />

      {loading ? (
        <Box
          flex={1}
          backgroundColor="primary"
          justifyContent="center"
          alignItems="center">
          <Text color="white" variant="title1">
            Loading...
          </Text>
        </Box>
      ) : (
        <FlatList
          renderItem={renderItem}
          keyExtractor={item => String(item?.id)}
          data={data.sort((a: IContact, b: IContact) => {
            if (order === 'First name') {
              if (b.first_name > a.last_name) {
                return -1;
              } else {
                return 1;
              }
            }

            if (order === 'Last name') {
              if (b.last_name > a.first_name) {
                return -1;
              } else {
                return 1;
              }
            }
          })}
          ItemSeparatorComponent={() => (
            <Box height={5} backgroundColor="grey" />
          )}
          ListEmptyComponent={
            <EmptyContactList message="Sorry, we could find any contacts" />
          }
          ListFooterComponent={<Box height={100} />}
        />
      )}

      <Box>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate(CREATE_CONTACT)}>
          <Icon name="add" type="MaterialIcon" size={35} color="white" />
        </TouchableOpacity>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ConctactListView;
