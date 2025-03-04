const common = {
  WHITE: '#FFFFFF',
  BLACK: '#111111',
  PURPLE_100: '#F2F0FC',
  PURPLE_300: '#A78BFA',
  PURPLE_500: '#5843BE',
  DANGER: '#F44336',
};

const colors = {
  light: {
    BACKGROUND: '#F2F0FC',
    PRIMARY: '#5843BE',
    SECONDARY: '#A78BFA',
    TEXT: '#6D6D6D',
    GRAY_100: '#F8F8F8',
    GRAY_300: '#BDBDBD',
    GRAY_500: '#545454',
    GRAY_700: '#333333',
    ...common,
  },
  dark: {
    BACKGROUND: '#121212',
    PRIMARY: '#B794F4 ',
    SECONDARY: '#D8B4FE ',
    TEXT: '#F5F5F5 ',
    GRAY_100: '#333333',
    GRAY_200: '#545454',
    GRAY_500: '#BDBDBD',
    GRAY_700: '#F8F8F8',
    ...common,
  },
} as const;

const colorHex = {
  RED: '#EC87A5',
  BLUE: '#B4E0FF',
  GREEN: '#CCE6BA',
  YELLOW: '#FFE594',
  PURPLE: '#C4C4E7',
} as const;

export {colors, colorHex};
