import * as React from 'react';
import {TouchableOpacity} from 'react-native';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import Styles from './styles.tsx';
import {Palette, Spaces} from '../../theme';
import {scaleNormalize} from '../../helpers/adaptive.ts';

type TCartCheckBox = {
  onCheckBoxPress: () => void;
  isActive: boolean;
  disabled?: boolean;
};

const CheckBox: React.FC<TCartCheckBox> = ({
  onCheckBoxPress,
  isActive,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onCheckBoxPress}
      style={{
        ...Styles.wrapper,
        borderWidth: isActive ? 0 : scaleNormalize(2),
        backgroundColor: isActive ? Palette.violet : Palette.white,
      }}>
      {isActive && (
        <Ionicons
          size={Spaces.regular}
          color={Palette.white}
          name={'checkmark-sharp'}
        />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
