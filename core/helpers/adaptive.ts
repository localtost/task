import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const {fontScale} = Dimensions.get('window');

const guidelineBaseWidth = 400;

const defaultScaleFactor = width < guidelineBaseWidth ? 1 : 0.5;

const scale = (size: number) => (width / guidelineBaseWidth) * size;

/* make adaptive fonSize  for all screens */
const fontAdaptive = (size: number, factor = defaultScaleFactor) =>
  fontScale > 1.4
    ? ((size + (scale(size) - size) * factor) / fontScale) * 1.353
    : size + (scale(size) - size) * factor;

const scaleFactor = (size: number) => (width / guidelineBaseWidth) * size;

const scaleNormalize = (size: number, factor = defaultScaleFactor) =>
  size + (scaleFactor(size) - size) * factor;

export {scaleNormalize, fontAdaptive};
