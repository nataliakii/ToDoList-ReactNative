import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title?: string;
  children?: ReactNode;
  style1?: StyleProp<ViewStyle>;
  style2?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const CustomTouchButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  children,
  style1,
  style2,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style1}>
      {title && <Text style={style2}>{title}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export default CustomTouchButton;
