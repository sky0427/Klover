import CustomHeader from '@/components/shared/CustomHeader';
import CustomText from '@/components/shared/CustomText';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import SearchBar from '@/components/shared/SearchBar';
import Wrapper from '@/components/shared/Wrapper';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const HomeScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();

  return (
    <ScreenWrapper>
      <CustomHeader
        leftIconName="MenuFillSvg"
        onLeftIconPress={() => navigation.openDrawer()}
      />

      <Wrapper mb={24}>
        <CustomText fontWeight="bold" style={styles.title}>
          Where do {'\n'}you want to go?
        </CustomText>
      </Wrapper>

      <Wrapper>
        <SearchBar />
      </Wrapper>
    </ScreenWrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Dimensions.get('screen').width * 0.05,
    },
    headerLabel: {
      fontSize: 18,
    },
    title: {
      fontSize: 26,
      paddingLeft: 3,
    },
  });

export default HomeScreen;
