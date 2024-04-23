import {StyleSheet} from 'react-native';
import {Palette, Spaces} from '../../theme';

const Styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spaces.regular,
    backgroundColor: Palette.white,
  },
  textStyle: {
    color: Palette.violet,
    fontWeight: '700',
  },
});

export default Styles;
