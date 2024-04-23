import {Palette, Spaces} from '../../theme';
import {Text, View} from 'react-native';
import * as React from 'react';
import Styles from './styles.ts';

type TSubHeader = {
  title: string;
};

const SubHeader: React.FC<TSubHeader> = ({title}) => {
  return (
    <View style={Styles.wrapper}>
      <Text style={Styles.textStyle}>{title}</Text>
    </View>
  );
};

export default SubHeader;
