import {StyleSheet} from 'react-native';
import {Palette, Spaces} from '../../theme';

const Styles = StyleSheet.create({
  wrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    padding: Spaces.regular,
    marginVertical: Spaces.small,
    elevation: 3,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spaces.regular,
    justifyContent: 'space-between',
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceTextStyle: {fontWeight: '700', color: Palette.lightViolet},
});

export default Styles;
