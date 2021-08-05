import React, {useState} from 'react';
import {ActivityIndicator, Image, StyleSheet} from 'react-native';
import {Box, Text, useTheme} from '../../theme';

interface ImageComponent {
  src: string;
}

const ImageComponent = ({src}: ImageComponent) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);
  const theme = useTheme();

  const onLoadStart = () => {
    setLoading(true);
    setError(true);
  };

  const onLoadEnd = () => {
    setLoading(false);
    setError(false);
  };

  const onError = () => {
    setLoading(false);
  };
  return (
    <Box style={styles.continaer}>
      {isLoading && (
        <ActivityIndicator color={theme.colors.primary} size="large" />
      )}
      <Image
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        source={{uri: src}}
        style={styles.image}
      />
      {error && (
        <Text textAlign="center" variant="body" color="secondary">
          Sorry there is an error with showing photo
        </Text>
      )}
    </Box>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  continaer: {flex: 1, height: 300, width: '100%'},

  image: {
    resizeMode: 'cover',
    width: '100%',
    flex: 1,
    height: 300,
  },
});
