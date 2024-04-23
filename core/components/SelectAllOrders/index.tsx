import Styles from './styles.ts';
import CheckBox from '../CheckBox';
import {Text, View} from 'react-native';
import * as React from 'react';

type TSelectAllOrdersProps = {
  onCheckBoxPress: () => void;
  isSelected: boolean;
  title: any;
};

const SelectWithText: React.FC<TSelectAllOrdersProps> = ({
  onCheckBoxPress,
  isSelected,
  title,
}) => {
  return (
    <View style={Styles.selectAllWrapper}>
      <CheckBox onCheckBoxPress={onCheckBoxPress} isActive={isSelected} />
      <Text style={Styles.selectAllTextStyle}>{title}</Text>
    </View>
  );
};

export default SelectWithText;
