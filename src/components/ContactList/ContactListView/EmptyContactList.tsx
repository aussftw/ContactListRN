import React from 'react';

import {Box, Text} from '../../../theme';

interface IEmptyContactList {
  message: string;
}

const EmptyContactList = ({message}: IEmptyContactList) => {
  return (
    <Box padding="xl" justifyContent="center" alignItems="center">
      <Text variant="title1" textAlign="center">
        {message}
      </Text>
    </Box>
  );
};

export default EmptyContactList;
