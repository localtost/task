import {StyleSheet} from 'react-native';
import {Palette, Spaces} from '../../theme';
import {fontAdaptive} from '../../helpers/adaptive.ts';

const Styles = StyleSheet.create({
  selectAllTextStyle: {
    fontWeight: '800',
    marginLeft: Spaces.small,
    color: Palette.violet,
    fontSize: fontAdaptive(18),
  },
  selectAllWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spaces.small,
  },
});

export default Styles;
