import {StyleSheet} from 'react-native';
import {Palette, Spaces} from '../../theme';

const Styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    borderColor: Palette.gray,
    borderRadius: Spaces.tiny,
    height: Spaces.regular * 1.5,
    justifyContent: 'center',
    width: Spaces.regular * 1.5,
  },
});

export default Styles;
