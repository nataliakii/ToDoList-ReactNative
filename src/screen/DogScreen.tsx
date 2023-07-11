import React, { useEffect, useState } from 'react';
import { useThemeMode } from '../context/themeContext';
import { themes } from '../palette/themes';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import axios from 'axios';
import CustomTouchButton from '../components/CustomTouchButton';
import i18n from '../translations/i18n';

const DogScreen: React.FC = () => {
  const { mode } = useThemeMode();
  const [dogImages, setDogImages] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('scottish');

  const background: ViewStyle = {
    backgroundColor: themes[mode || 'light'].background.primary,
  };
  const text: TextStyle = {
    color: themes[mode || 'light']?.text.primary,
    fontSize: themes.textSize.medium,
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get(
        'https://dog.ceo/api/breed/terrier/list',
      );
      setBreeds(response.data.message);
      setSelectedBreed(response.data.message[10]);
    } catch (error) {
      console.error('Failed to fetch breeds:', error);
    }
  };

  const fetchDogImages = async () => {
    try {
      const response = await axios.get(
        `https://dog.ceo/api/breed/terrier/${selectedBreed}/images/random/20`,
      );
      setDogImages(response.data.message);
    } catch (error) {
      console.error('Failed to fetch dog images:', error);
    }
  };

  const handleBreedSelection = (breed: string) => {
    setSelectedBreed(breed);
  };
  
  useEffect(() => {
    fetchDogImages();
  }, [ selectedBreed ] );
  
  const borderBottom: ViewStyle = {
    borderBottomColor: themes[mode || 'light'].border.primary,
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={{ ...styles.selectedBreedText, ...text }}>
        {i18n.t('dog.select')}: {selectedBreed}-terrier
      </Text>
      <FlatList
        data={breeds}
        horizontal
        keyExtractor={item => item}
        renderItem={( {item} ) => (
          <CustomTouchButton
          style1={{ ...borderBottom, ...text }}
          onPress={() => handleBreedSelection(item)}
          style2={[
            styles.breedText,
            { color: item === selectedBreed ? 'blue' : 'black' },
          ]}
          title={item}
        />
        )}
      />
    </View>
  );

  const renderDogImage = ({ item }: { item: string }) => (
    <Image style={styles.image} source={{ uri: item }} />
  );

  return (
    <View style={{ ...styles.container, ...background }}>
      <FlatList
        data={dogImages}
        keyExtractor={(_, index) => String(index)}
        numColumns={2}
        renderItem={renderDogImage}
        contentContainerStyle={styles.gridContainer}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  image: {
    width: Dimensions.get('window').width / 2 - 15,
    height: Dimensions.get('window').width / 2 - 15,
    margin: 3,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedBreedText: {
    fontSize: 24,
    marginRight: 10,
  },
  breedText: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default DogScreen;
