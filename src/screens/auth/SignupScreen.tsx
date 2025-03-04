import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputField from '@/components/shared/InputField';

const SignupScreen = () => {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <InputField autoFocus label="Email" placeholder="Email" />
      </View>
      <Text>SignupScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#F2F0FC',
  },
});

export default SignupScreen;
