import useLanguageStore from '@/store/useLanguageStore';
import {Text, TextProps, TextStyle} from 'react-native';

type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

interface CustomTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  fontWeight?: FontWeight;
  lineHeightPercentage?: number;
  letterSpacingPercentage?: number;
}

const LETTER_SPACE = -0.024;
const LINE_HEIGHT = 1.4;

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  fontWeight = 'regular',
  lineHeightPercentage,
  letterSpacingPercentage,
  ...props
}) => {
  const {language, getFontFamily} = useLanguageStore();
  const fontFamily = getFontFamily(language, fontWeight);

  const fontSize = Array.isArray(style)
    ? style.find((s: any) => s?.fontSize)?.fontSize || 16
    : (style as TextStyle)?.fontSize || 16;

  const lineHeight =
    lineHeightPercentage !== undefined
      ? fontSize * lineHeightPercentage
      : fontSize * LINE_HEIGHT;

  const letterSpacing =
    letterSpacingPercentage !== undefined
      ? fontSize * letterSpacingPercentage
      : fontSize * LETTER_SPACE;

  const combinedStyles: TextStyle = {
    fontFamily,
    letterSpacing,
    lineHeight,
    ...(Array.isArray(style) ? Object.assign({}, ...style) : style),
  };

  if (combinedStyles.fontWeight) {
    combinedStyles.fontFamily = undefined;
  }

  return (
    <Text style={combinedStyles} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
