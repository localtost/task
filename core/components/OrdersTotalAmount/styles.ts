import {StyleSheet} from 'react-native';
import {Palette, Spaces} from '../../theme';

const Styles = StyleSheet.create({
  wrapper: {
    padding: Spaces.regular,
    backgroundColor: Palette.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spaces.regular,
  },
  textStyle: {fontWeight: '700'},
});

export default Styles;
