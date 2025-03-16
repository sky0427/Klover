import CustomIcon from '@/components/shared/CustomIcon';
import {colors} from '@/constants/colors';
import {commNavigations} from '@/constants/navigations';
import {shadow, sizes, spacing} from '@/constants/theme';
import {
  useAddCommPostLikeMutation,
  useAddCommPostSaveMutation,
  useCommPostDetailQuery,
  useDeleteCommPostLikeMutation,
  useDeleteCommPostMutation,
  useDeleteCommPostSaveMutation,
} from '@/hooks/react-query/useCommPostQueries';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {CommStackParamList} from '@/navigations/stack/CommStackNavigator';
import useLanguageStore from '@/store/useLanguageStore';
import useThemeStore from '@/store/useThemeStore';
import useAuthStore from '@/store/zustand/useAuthStore';
import {ThemeMode} from '@/types/type';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type CommDetailScreenProps = CompositeScreenProps<
  StackScreenProps<CommStackParamList, typeof commNavigations.COMM_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;

const CommDetailScreen = ({navigation, route}: CommDetailScreenProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {t} = useTranslation();
  const {user} = useAuthStore();
  const {language} = useLanguageStore();
  const insets = useSafeAreaInsets();
  const {id} = route.params;

  const {data} = useCommPostDetailQuery(id);
  const {mutate: addLikeMutate} = useAddCommPostLikeMutation(id);
  const {mutate: addSaveMutate} = useAddCommPostSaveMutation(id);
  const {mutate: deleteLikeMutate} = useDeleteCommPostLikeMutation(id);
  const {mutate: deleteSaveMutate} = useDeleteCommPostSaveMutation(id);
  const {mutate: deleteMutate} = useDeleteCommPostMutation(id);

  return (
    <View style={styles.container}>
      <Animatable.View
        style={[styles.backButton, {marginTop: insets.top}]}
        animation={'fadeIn'}
        delay={500}
        duration={400}
        easing={'ease-in-out'}>
        <CustomIcon
          name="LeftFillSvg"
          size={24}
          color={colors[theme].PRIMARY}
          style={[styles.backIcon]}
          onPress={navigation.goBack}
        />
      </Animatable.View>

      <Animatable.View
        style={[styles.favoriteButton, {marginTop: insets.top}]}
        animation={'fadeIn'}
        delay={500}
        duration={400}
        easing={'ease-in-out'}>
        <CustomIcon
          name="HeartFillSvg"
          size={24}
          color={colors[theme].PRIMARY}
          onPress={() => {}}
        />
      </Animatable.View>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBox: {
      borderRadius: sizes.radius,
      overflow: 'hidden',
    },
    image: {
      width: sizes.width,
      height: sizes.height,
      resizeMode: 'cover',
    },
    backButton: {
      position: 'absolute',
      left: spacing.l,
      zIndex: 1,
    },
    backIcon: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: 4,
      borderRadius: sizes.radius,
      ...shadow.light,
    },
    favoriteButton: {
      position: 'absolute',
      right: spacing.l,
      zIndex: 1,
    },
  });

export default CommDetailScreen;
