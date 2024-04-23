import {scaleNormalize} from '../helpers/adaptive.ts';

enum Palette {
  yellow = 'rgb(255,206,155)',
  violet = 'rgb(99,54,81)',
  lightViolet = 'rgb(193,152,177)',
  white = 'rgb(255,255,255)',
  gray = 'rgb(176,176,176)',
  lightYellow = 'rgb(255,232,221)',
}

enum Spaces {
  tiny = scaleNormalize(4),
  small = scaleNormalize(8),
  regular = scaleNormalize(16),
  large = scaleNormalize(32),
}

export {Palette, Spaces};
