import {CommPostForm} from '@/components/post/CommPostForm';
import CustomHeader from '@/components/shared/CustomHeader';
import CustomText from '@/components/shared/CustomText';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import Wrapper from '@/components/shared/Wrapper';
import {mapNavigations} from '@/constants/navigations';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

const AddPostScreen = ({navigation, route}: AddPostScreenProps) => {
  const {location} = route.params;

  return (
    <ScreenWrapper>
      <CustomHeader
        rightIconNames={['EditLineSvg']}
        onLeftIconPress={navigation.goBack}>
        <CustomText fontWeight="bold" style={{fontSize: 16}}>
          Create New Post
        </CustomText>
      </CustomHeader>
      {/* <PostForm /> */}
      <Wrapper>
        <CommPostForm />
      </Wrapper>
    </ScreenWrapper>
  );
};

export default AddPostScreen;
