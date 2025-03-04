import useLanguageStore from '@/store/useLanguageStore';
import {Text, TextProps, TextStyle} from 'react-native';

type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

interface CustomTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  fontWeight?: FontWeight;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  fontWeight = 'regular',
  ...props
}) => {
  const {language, getFontFamily} = useLanguageStore();
  const fontFamily = getFontFamily(language, fontWeight);

  const combinedStyles: TextStyle = {
    fontFamily,
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
