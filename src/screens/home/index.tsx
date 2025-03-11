import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeMode} from '@/types/type';
import useThemeStore from '@/store/useThemeStore';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {Card} from '@/components/home/Cards';

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
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Card
            item={item}
            onPress={() => console.log(Dimensions.get('screen').width * 0.05)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{display: 'flex', gap: 12}}
      />

      <Card item={data} />
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Dimensions.get('screen').width * 0.05,
    },
  });

export default HomeScreen;

const data = [
  {
    id: 1,
    title: 'Kyeongbok Palace',
    location: 'Seoul',
  },
];
