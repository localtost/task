import {StyleSheet} from 'react-native';
import {Palette, Spaces} from '../../../theme';

const Styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spaces.regular,
  },
  blockWrapper: {
    paddingVertical: Spaces.small,
    paddingHorizontal: Spaces.small,
  },
  amountTextStyle: {
    fontWeight: '700',
    color: Palette.white,
  },
});

export default Styles;
