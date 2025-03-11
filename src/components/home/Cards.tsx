import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../shared/CustomText';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import CustomIcon from '../shared/CustomIcon';

interface CardsProps {
  item: any;
  onPress?: () => void;
}

const {width} = Dimensions.get('screen');

export const Card = ({item, onPress}: CardsProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardLikeContainer}>
        <CustomIcon name="HeartFillSvg" size={20} color="#fff" />
        <CustomText>Like</CustomText>
      </View>

      <Image
        source={require('@/assets/images/sample-img.png')}
        style={styles.cardImage}
      />

      <View style={styles.cardContent}>
        <CustomText style={styles.cardNameText}>Seoul</CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    cardContainer: {
      flex: 1,
      width: '100%',
      maxWidth: 180,
      paddingHorizontal: 12,
      paddingVertical: 16,
      borderRadius: 8,
      backgroundColor: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.7)',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      position: 'relative',
    },
    cardLikeContainer: {
      alignItems: 'center',
      position: 'absolute',
      paddingHorizontal: 8,
      top: 20,
      right: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      padding: 4,
      borderRadius: 20,
      zIndex: 50,
    },
    cardImage: {
      width: '100%',
      height: 160,
      borderRadius: 8,
    },
    cardContent: {
      flexDirection: 'column',
      marginTop: 8,
    },
    cardNameText: {
      fontSize: 16,
      color: '#333',
    },
  });
