import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type ItemType = {
  id: number;
  title: string;
  done: boolean;
};

const Checkbox: React.FC<{
  handlePress: (item: ItemType, isChecked: boolean) => void;
  item: ItemType;
}> = ({handlePress, item}) => {
  return (
    <BouncyCheckbox
      size={25}
      fillColor="#BF1769"
      unfillColor="#FFFFFF"
      iconStyle={{borderColor: '#BF1769'}}
      innerIconStyle={{borderWidth: 2}}
      onPress={(isChecked: boolean) => handlePress(item, isChecked)}
    />
  );
};

export default Checkbox;
