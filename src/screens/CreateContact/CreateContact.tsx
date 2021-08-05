import React, {useRef} from 'react';
import CreateContactView from '../../components/CreateContact/CreateContactView';

interface Props {}

const CreateContact = () => {
  const sheetRef = useRef(null);

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  return (
    <CreateContactView
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
    />
  );
};

export default CreateContact;
