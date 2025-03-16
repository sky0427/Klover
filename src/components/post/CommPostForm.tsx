import {uploadCommPostImage} from '@/api/commPostApi';
import CustomIcon from '@/components/shared/CustomIcon';
import {colors} from '@/constants/colors';
import {sizes} from '@/constants/theme';
import {useWriteCommPostMutation} from '@/hooks/react-query/useCommPostQueries';
import {CommStackParamList} from '@/navigations/stack/CommStackNavigator';
import useLanguageStore from '@/store/useLanguageStore';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {ImageOrVideo} from 'react-native-image-crop-picker';

export const CommPostForm = ({route}: any) => {
  const [imageToUpload, setImageToUpload] = useState<ImageOrVideo | undefined>(
    undefined,
  );
  const [currentContent, setCurrentContent] = useState<string>('');
  const {language} = useLanguageStore();
  const {t} = useTranslation();
  const {theme} = useThemeStore();

  const navigation = useNavigation<StackNavigationProp<CommStackParamList>>();

  const styles = styling(theme);
  const {mutate} = useWriteCommPostMutation();

  const openImagePicker = () => {
    uploadCommPostImage(setImageToUpload);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.imageContainer}>
        {imageToUpload ? (
          <Image source={{uri: imageToUpload.path}} style={styles.image} />
        ) : (
          <CustomIcon
            name="PicFillSvg"
            size={180}
            color={colors[theme].PURPLE_500}
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={openImagePicker}
          />
        )}
      </View>
      <View style={{}}>
        <TextInput
          style={styles.content}
          value={currentContent}
          onChangeText={setCurrentContent}
          multiline
        />
      </View>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    image: {
      resizeMode: 'cover',
      borderRadius: 10,
    },
    content: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors[theme].BORDER,
      borderRadius: sizes.radius,
      height: 300,
      color: colors[theme].BLACK,
    },
    imageButton: {
      width: '40%',
      alignSelf: 'center',
      backgroundColor: colors[theme].PURPLE_300,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    imageButtonText: {
      fontSize: 16,
      textAlign: 'center',
      color: colors[theme].WHITE,
    },
  });
