import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Styles from './styles.ts';

export type TPayProps = {
  onButtonPress: () => void;
  itemQuantity?: number;
  totalAmount?: number;
};

const Buttons = () => {
  return null;
};

const Pay: React.FC<TPayProps> = ({
  totalAmount = 0,
  itemQuantity = 0,
  onButtonPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onButtonPress}
      activeOpacity={0.8}
      style={Styles.payButtonWrapper}>
      <Text style={Styles.payButtonTextStyle}>PAY</Text>
      <Text
        style={
          Styles.payButtonTextStyle
        }>{`${itemQuantity} / ${totalAmount} CHF`}</Text>
    </TouchableOpacity>
  );
};

Buttons.Pay = Pay;

export default Buttons;
