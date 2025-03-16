import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import CustomIcon from '@/components/shared/CustomIcon.tsx';
import userDefaultImage from '@/assets/images/user-default.png';
import {CORE_API_BASE_URL} from '@env';
import axios from 'axios';
import {colors} from '@/constants/colors.ts';

interface Message {
  id: string;
  senderId: string;
  text: string;
}

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdW5odWk5Nzg5QGdtYWlsLmNvbSIsImF1dGgiOiJVU0VSIiwibmlja25hbWUiOiLqtazspIDtnJgiLCJpZCI6MTEsImNvdW50cnkiOiJFTiIsInByb3ZpZGVyIjoic2VydmVyIiwiaWF0IjoxNzQxOTI5OTg2LCJleHAiOjE3NDE5MzM1ODZ9.E6qfcaa7oxc8YdR8UGEcINuJWU4azyYQIOsr-ksc6CA';
const memberId = 1;
const memberNickname = 'chill_guy';

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleBackPress = () => {
    // TODO: 뒤로 가기 로직 추가
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    // TODO: 실제 API 연결 필요
    setMessages([
      {id: '1', senderId: '2', text: '안녕하세요!'},
      {id: '2', senderId: '1', text: '안녕하세요! 반갑습니다.'},
      {id: '3', senderId: '2', text: '채팅 기능 테스트 중입니다.'},
    ]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) {
      return;
    }

    const newMessage: Message = {
      id: new Date().toISOString(),
      senderId: '1',
      text: inputText,
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const renderMessage = ({item, index}: {item: Message; index: number}) => {
    const isCurrentUser = item.senderId === memberId.toString();
    const isLastFromUser =
      index === messages.length - 1 ||
      messages[index + 1]?.senderId !== item.senderId;

    return (
      <View
        style={[
          styles.messageRow,
          isCurrentUser ? styles.rightAlign : styles.leftAlign,
        ]}>
        {/* 상대방 메시지일 때 프로필 이미지 */}
        <View style={styles.profileImageWrapper}>
          {!isCurrentUser && isLastFromUser && (
            <Image source={userDefaultImage} style={styles.profileImage} />
          )}
        </View>

        <View
          style={[
            styles.messageContainer,
            index > 0 && messages[index - 1]?.senderId !== item.senderId
              ? styles.messageSpacing
              : null,
          ]}>
          <View
            style={[
              styles.messageBubble,
              isCurrentUser ? styles.myMessage : styles.otherMessage,
            ]}>
            <Text
              style={
                isCurrentUser ? styles.myMessageText : styles.otherMessageText
              }>
              {item.text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomIcon name="LeftLineSvg" size={24} onPress={() => {}} />
        <Text style={styles.headerNickname}>{memberNickname}</Text>
        <CustomIcon name="GridLineSvg" size={24} onPress={() => {}} />
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="메시지를 입력하세요"
            autoCapitalize="none"
          />
          <CustomIcon
            name="PicLineSvg"
            size={24}
            style={styles.picIcon}
            onPress={() => {}}
          />
          <CustomIcon
            name="SendLineSvg"
            size={24}
            style={[styles.sendIcon, {opacity: inputText.length > 0 ? 1 : 0}]}
            onPress={handleSendMessage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F0FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerNickname: {
    fontSize: 22,
    marginLeft: 12,
    flex: 1,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end', // 가장 아래쪽부터 메시지를 정렬
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row', // 기본적으로 가로 정렬
    alignItems: 'center',
    marginBottom: 4,
    marginHorizontal: 6, // 좌우 여백 감소
  },
  messageSpacing: {
    marginTop: 12, // 다른 사용자의 메시지와 간격을 늘림
  },
  leftAlign: {
    justifyContent: 'flex-start', // 상대방 메시지 왼쪽 정렬
  },
  rightAlign: {
    justifyContent: 'flex-end', // 본인 메시지 오른쪽 정렬
  },
  profileImageWrapper: {
    width: 38, // 프로필 이미지 영역을 고정하여 정렬 유지
    alignItems: 'center',
    alignSelf: 'flex-end', // 메시지와 같은 높이로 정렬
    marginBottom: 10, // 너무 붙지 않도록 약간의 여백 추가
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  profileImageLeft: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8, // 상대방 메시지는 왼쪽에 위치
  },
  profileImageRight: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 8, // 본인 메시지는 오른쪽에 위치
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    maxWidth: 200, // 메시지 최대 너비 조정 (한 줄 제한 기준)
    minWidth: 40, // 최소 너비 추가
    flexWrap: 'wrap', // 자동 줄바꿈
    alignSelf: 'flex-start', // 메시지 정렬 보정
  },
  myMessage: {
    backgroundColor: colors.light.SECONDARY,
  },
  otherMessage: {
    backgroundColor: 'white',
  },
  myMessageText: {
    fontSize: 16,
    color: 'white',
    flexWrap: 'wrap', // 텍스트 자동 줄바꿈 추가
    width: '100%', // 너비를 제한하여 줄바꿈을 유도
  },
  otherMessageText: {
    fontSize: 16,
    color: 'black',
    flexWrap: 'wrap', // 텍스트 자동 줄바꿈 추가
    width: '100%', // 너비를 제한하여 줄바꿈을 유도
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingLeft: 16,
    paddingRight: 60, // 아이콘 공간 확보
    flex: 1,
    position: 'relative',
    minHeight: 48, // 입력 필드의 최소 높이 지정
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 10,
    paddingRight: 60, // 아이콘 공간 확보
    fontSize: 16,
  },
  picIcon: {
    position: 'absolute',
    right: 15,
  },
  sendIcon: {
    position: 'absolute',
    right: 50,
    opacity: 0, // 기본적으로 보이지 않지만 공간을 차지함
  },
});

export default ChatScreen;
