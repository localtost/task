import {EStatuses} from '../../../redux/rtkq/types.ts';
import {Palette, Spaces} from '../../../theme';
import {Text, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import * as React from 'react';
import Styles from './styles.ts';

type TDishQuantityProps = {
  dishStatus: EStatuses;
  onRemoveDishAmount: () => void;
  dishAmount: number;
  onAddDishAmount: () => void;
};

const DishQuantity: React.FC<TDishQuantityProps> = ({
  dishStatus,
  onAddDishAmount,
  onRemoveDishAmount,
  dishAmount,
}) => {
  return (
    <View
      style={{
        backgroundColor:
          dishStatus === EStatuses.New ? Palette.violet : Palette.gray,
        ...Styles.wrapper,
      }}>
      <TouchableOpacity
        style={Styles.blockWrapper}
        onPress={onRemoveDishAmount}
        disabled={dishStatus !== EStatuses.New}>
        <Ionicons
          name={'remove-outline'}
          color={Palette.white}
          size={Spaces.regular}
        />
      </TouchableOpacity>

      <Text style={Styles.amountTextStyle}>{dishAmount}</Text>

      <TouchableOpacity
        onPress={onAddDishAmount}
        disabled={dishStatus !== EStatuses.New}
        style={Styles.blockWrapper}>
        <Ionicons
          name={'add-sharp'}
          color={Palette.white}
          size={Spaces.regular}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DishQuantity;
