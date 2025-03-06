import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeMode} from '@/types/type';
import useThemeStore from '@/store/useThemeStore';
import MyList from '@/components/home/MyList';
import CustomIcon from '@/components/shared/CustomIcon';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const HomeScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
      <Pressable onPress={() => navigation.openDrawer()}>
        <CustomIcon name="AddFillSvg" size={24} color="#fff" />
      </Pressable>
      <MyList language="JpnService1" areaCode="1" />
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default HomeScreen;
