// App.tsx
import React from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native'; // ScrollView 추가

import CustomText from '@/components/shared/CustomText';
import useLanguageStore from '@/store/useLanguageStore';
import {Country} from '@/types';
import '@/utils/i18n';
import {useTranslation} from 'react-i18next';

const TestScreen = () => {
  const {language, setLanguage} = useLanguageStore();
  const {t, i18n: i18nInstance} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomText style={styles.text}>
          {/* t 함수를 사용하여 번역된 텍스트를 가져옴 */}
          {t('currentLanguage', {language})}
        </CustomText>
        <CustomText style={styles.text}>{t('helloWorld')}</CustomText>

        <CustomText fontWeight="light" style={styles.text}>
          Light Text (기본 언어)
        </CustomText>
        <CustomText fontWeight="regular" style={styles.text}>
          Regular Text (기본 언어)
        </CustomText>
        <CustomText fontWeight="medium" style={styles.text}>
          Medium Text (기본 언어)
        </CustomText>
        <CustomText fontWeight="semibold" style={styles.text}>
          SemiBold Text (기본 언어)
        </CustomText>
        <CustomText fontWeight="bold" style={styles.text}>
          Bold Text (기본 언어)
        </CustomText>

        <View style={styles.buttonContainer}>
          <Button title="English" onPress={() => setLanguage(Country.EN)} />
          <Button title="Japanese" onPress={() => setLanguage(Country.JA)} />
          <Button title="Korean" onPress={() => setLanguage(Country.KO)} />
          <Button title="Chinese" onPress={() => setLanguage(Country.ZH)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    // flex: 1, // ScrollView를 사용하므로 flexGrow: 1로 변경
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // 상하 패딩 추가
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
export default TestScreen;
