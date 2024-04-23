import * as React from 'react';
import {Text, View} from 'react-native';
import Styles from './styles.ts';
import {TPayProps} from '../Buttons';

type TOrdersTotalAmountProps = Omit<TPayProps, 'onButtonPress'>;

const OrdersTotalAmount: React.FC<TOrdersTotalAmountProps> = ({
  itemQuantity,
  totalAmount,
}) => {
  return (
    <View style={Styles.wrapper}>
      <Text style={Styles.textStyle}>Total:</Text>
      <Text
        style={Styles.textStyle}>{`${itemQuantity} / CHF ${totalAmount}`}</Text>
    </View>
  );
};

export default OrdersTotalAmount;
