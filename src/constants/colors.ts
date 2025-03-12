const common = {
  UNCHANGE_WHITE: '#FFFFFF',
  UNCHANGE_BLACK: '#111111',
  PURPLE_100: '#F2F0FC',
  PURPLE_300: '#A78BFA',
  PURPLE_500: '#5843BE',
  DANGER: '#DC3545',
  SUCCESS: '#28A745',
};

const colors = {
  light: {
    WHITE: '#FFFFFF',
    BACKGROUND: '#F2F0FC',
    PRIMARY: '#5843BE',
    SECONDARY: '#FF9C01',
    BORDER: '#D3D3D3',
    INPUT: '#FAFAFA',
    TEXT: '#6C757D',
    GRAY_100: '#F8F8F8',
    GRAY_300: '#BDBDBD',
    GRAY_500: '#6D6D6D',
    GRAY_700: '#545454',
    GRAY_900: '#333333',
    BLACK: '#111111',
    ...common,
  },
  dark: {
    WHITE: '#111111',
    BACKGROUND: '#161622',
    PRIMARY: '#7B68EE',
    SECONDARY: '#FFB347',
    BORDER: '#232533',
    INPUT: '#1E1E2D',
    TEXT: '#CDCDE0',
    GRAY_100: '#333333',
    GRAY_300: '#545454',
    GRAY_500: '#7b7b8b',
    GRAY_700: '#BDBDBD',
    GRAY_900: '#F8F8F8',
    BLACK: '#FFFFFF',
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

export {colorHex, colors};
