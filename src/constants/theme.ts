import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const shadow = {
  light: {
    shadowColor: 'rgba(88, 67, 190, 1)',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },
  dark: {
    shadowColor: '#5843BE',
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};

export const sizes = {
  width,
  height,
  h1: 32,
  h2: 24,
  h3: 18,
  h4: 16,
  sm: 12,
  body: 14,
  radius: 16,
};

export const spacing = {
  width,
  height,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};
