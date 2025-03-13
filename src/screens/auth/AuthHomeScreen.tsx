import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import Wrapper from '@/components/shared/Wrapper';
import CustomButton from '@/components/shared/CustomButton';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import LogoDarkSvg from '@/assets/images/logo_dark.svg';
import LogoLightSvg from '@/assets/images/logo_light.svg';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNavigations} from '@/constants/navigations';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({navigation}: AuthHomeScreenProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <ScreenWrapper style={styles.container}>
      <Wrapper
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {theme === 'light' && <LogoLightSvg width={283} height={130} />}
        {theme === 'dark' && <LogoDarkSvg width={283} height={130} />}

        {/* <Image
          source={images.welcome}
          style={{height: 310, marginTop: 12}}
          resizeMode="contain"
        /> */}
      </Wrapper>

      <Wrapper mb={60} style={styles.buttonContainer}>
        <CustomButton
          label="GET STARTED"
          onPress={() => navigation.navigate(authNavigations.SIGNIN)}
        />
        <CustomButton variant="outlined" label="LOOK AROUND" />
      </Wrapper>
    </ScreenWrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    buttonContainer: {
      gap: 16,
    },
  });

export default AuthHomeScreen;
