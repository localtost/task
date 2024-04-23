import {View} from 'react-native';
import Styles from './styles.ts';
import React, {PropsWithChildren} from 'react';

const OrderScreenView: React.FC<PropsWithChildren> = ({children}) => {
  return <View style={Styles.wrapper}>{children}</View>;
};

export default OrderScreenView;
