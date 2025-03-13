import HotPlaceCarousel from '@/components/home/HotPlaceCarousel';
import PlaceCarousel from '@/components/home/PlaceCarousel';
import SectionHeader from '@/components/home/SectionHeader';
import CustomBanner from '@/components/shared/CustomBanner';
import CustomHeader from '@/components/shared/CustomHeader';
import CustomIcon from '@/components/shared/CustomIcon';
import CustomText from '@/components/shared/CustomText';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import Wrapper from '@/components/shared/Wrapper';
import {colors} from '@/constants/colors';
import {Categories, Cities} from '@/constants/data';
import {homeNavigations} from '@/constants/navigations';
import {sizes, spacing} from '@/constants/theme';
import {useTourPostsQuery} from '@/hooks/react-query/useTourPostQueries';
import useUserLocation from '@/hooks/useUserLocation';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import useLanguageStore from '@/store/useLanguageStore';
import useThemeStore from '@/store/useThemeStore';
import {TourPostSort} from '@/types';
import {ThemeMode} from '@/types/type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const HomeScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();
  const {language} = useLanguageStore();
  const {userLocation} = useUserLocation();
  const [page, setPage] = React.useState(0);

  const {data, isLoading, error, refetch} = useTourPostsQuery({
    language,
    mapX: userLocation.longitude,
    mapY: userLocation.latitude,
    page: page,
    size: 10,
    sort: TourPostSort.Distance,
    // area: Area.SEOUL,
    // contentType: ContentType.Accommodation,
    // searchByTitle: false,
    // searchByOverview: false,
    // hasExotic: false,
    // hasHealing: false,
    // hasActive: false,
    // hasTraditional: false,
  });

  const handlePressSearch = () => {
    navigation.navigate(homeNavigations.SEARCH);
  };

  return (
    <ScreenWrapper>
      <CustomHeader
        leftIconName="MenuFillSvg"
        iconColor={colors[theme].BLACK}
        onLeftIconPress={() => navigation.openDrawer()}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            fontWeight="bold"
            style={{color: colors[theme].BLACK, fontSize: sizes.h3}}>
            Seoul
          </CustomText>
          <CustomIcon
            name="DownsmFillSvg"
            size={24}
            color={colors[theme].BLACK}
          />
        </TouchableOpacity>
      </CustomHeader>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper mb={spacing.xl}>
          <CustomText fontWeight="bold" style={styles.title}>
            Where do {'\n'}you want to go?
          </CustomText>
        </Wrapper>

        <Wrapper>
          <Pressable
            style={[styles.searchContainer]}
            onPress={handlePressSearch}>
            <CustomText fontWeight="medium" style={styles.searchText}>
              Search ...
            </CustomText>
            <CustomIcon
              name="Search3LineSvg"
              size={20}
              color={colors[theme].PRIMARY}
            />
          </Pressable>
        </Wrapper>

        <CustomBanner content="Prepared the attractive elements of trip around you 😎" />

        <Wrapper ph={0} mb={spacing.xxl}>
          <SectionHeader title="Representative Cities" onPress={() => {}} />
          <PlaceCarousel data={Cities} />
        </Wrapper>

        <Wrapper ph={0} mb={spacing.xxl}>
          <SectionHeader title="Hot Place by Koreans" onPress={() => {}} />
          <HotPlaceCarousel data={data ? data?.contents : []} />
        </Wrapper>

        <Wrapper ph={0} mb={spacing.xxl}>
          <SectionHeader title="Hot Place by Foreigners" onPress={() => {}} />
          <HotPlaceCarousel data={data ? data?.contents : []} />
        </Wrapper>

        <Wrapper ph={0}>
          <SectionHeader title="Useful Travel Info" onPress={() => {}} />
          <View
            style={{
              width: sizes.width,
              paddingHorizontal: spacing.width * 0.05,
              gap: spacing.m,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {Categories.map(item => (
              <TouchableOpacity>
                <Image
                  source={item.image}
                  style={{
                    width: (sizes.width - spacing.l * 3) / 2,
                    height: (sizes.width - spacing.l * 3) / 2,
                    borderRadius: sizes.radius,
                    resizeMode: 'cover',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: (sizes.width - spacing.l * 3) / 2,
                    height: (sizes.width - spacing.l * 3) / 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: sizes.radius,
                  }}
                />
                <CustomText
                  fontWeight="semibold"
                  style={{
                    position: 'absolute',
                    color: colors[theme].UNCHANGE_WHITE,
                    fontSize: sizes.body,
                    bottom: spacing.m,
                    left: spacing.m,
                  }}>
                  {item.title}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </Wrapper>
      </ScrollView>
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
      color: colors[theme].BLACK,
      paddingLeft: 3,
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1.5,
      borderColor: colors[theme].PRIMARY,
      height: 56,
      paddingHorizontal: 12,
      alignItems: 'center',
      borderRadius: 16,
      backgroundColor: colors[theme].INPUT,
    },
    searchText: {
      flex: 1,
      fontSize: 14,
      color: colors[theme].TEXT,
    },
  });

export default HomeScreen;
