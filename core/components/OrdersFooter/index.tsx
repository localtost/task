import OrdersTotalAmount from '../OrdersTotalAmount';
import Buttons, {TPayProps} from '../Buttons';
import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Styles from './styles.ts';

type TOrdersFooter = TPayProps & {
  totalPayAmount: number;
  totalPayQuantity: number;
};

const OrdersFooter: React.FC<TOrdersFooter> = ({
  totalAmount = 0,
  itemQuantity = 0,
  totalPayAmount = 0,
  totalPayQuantity = 0,
  onButtonPress,
}) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <View
      style={StyleSheet.compose(Styles.wrapper, {
        paddingBottom: bottom,
      })}>
      <OrdersTotalAmount
        itemQuantity={itemQuantity}
        totalAmount={totalAmount}
      />
      <Buttons.Pay
        onButtonPress={onButtonPress}
        itemQuantity={totalPayQuantity}
        totalAmount={totalPayAmount}
      />
    </View>
  );
};

export default OrdersFooter;
