import React from 'react';
import { TouchableOpacity, Image, ViewStyle, StyleSheet } from 'react-native';

type CustomButtonProps = {
  onPress: () => void;
  iconSource: any;
  style?: ViewStyle;
};

const CustomTouchButton: React.FC<CustomButtonProps> = ({
  onPress,
  iconSource,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image source={iconSource} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default CustomTouchButton;

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});
