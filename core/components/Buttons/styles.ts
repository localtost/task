import {StyleSheet} from 'react-native';
import {Palette, Spaces} from '../../theme';
import {scaleNormalize} from '../../helpers/adaptive.ts';

const Styles = StyleSheet.create({
  payButtonWrapper: {
    backgroundColor: Palette.violet,
    flexDirection: 'row',
    borderRadius: scaleNormalize(24),
    padding: Spaces.regular,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payButtonTextStyle: {
    fontWeight: '700',
    color: Palette.white,
  },
});

export default Styles;
