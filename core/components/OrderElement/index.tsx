import {Text, TouchableOpacity, View} from 'react-native';
import {Palette, Spaces} from '../../theme';
import {EStatuses} from '../../redux/rtkq/types.ts';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import * as React from 'react';
import SelectWithText from '../SelectAllOrders';
import Styles from './styles.ts';
import DishQuantity from './Quantity';

type TOrderElementProps = {
  dishStatus: EStatuses;
  isDishActive: boolean;
  dishName: string;
  dishPrice: number;
  dishAmount: number;
  onRemoveDishAmount: () => void;
  onDeleteItemButtonPress: () => void;
  onAddDishAmount: () => void;
  onDishCheckBoxPress: () => void;
};

const OrderElement: React.FC<TOrderElementProps> = ({
  dishStatus,
  isDishActive,
  dishName,
  onRemoveDishAmount,
  dishPrice,
  onAddDishAmount,
  dishAmount,
  onDeleteItemButtonPress,
  onDishCheckBoxPress,
}) => {
  return (
    <View
      style={{
        backgroundColor:
          dishStatus === EStatuses.Ready ? Palette.lightYellow : Palette.white,
        ...Styles.wrapper,
      }}>
      <View style={Styles.titleWrapper}>
        <SelectWithText
          onCheckBoxPress={onDishCheckBoxPress}
          isSelected={isDishActive}
          title={dishName}
        />

        {dishStatus === EStatuses.New && (
          <TouchableOpacity onPress={onDeleteItemButtonPress}>
            <Ionicons
              name={'close'}
              color={Palette.violet}
              size={Spaces.large}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={Styles.priceWrapper}>
        <Text style={Styles.priceTextStyle}>{`CHF ${dishPrice}`}</Text>

        <DishQuantity
          dishStatus={dishStatus}
          onRemoveDishAmount={onRemoveDishAmount}
          dishAmount={dishAmount}
          onAddDishAmount={onAddDishAmount}
        />
      </View>
    </View>
  );
};

export default OrderElement;
