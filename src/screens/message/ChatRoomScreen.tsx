import userDefaultImage from '@/assets/images/user-default.png';
import CustomIcon from '@/components/shared/CustomIcon.tsx';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';

interface MemberInfoDto {
  email: string;
  nickname: string;
  profileUrl: string | null;
  role: string;
  id: string;
  country: string;
  provider: string;
}

interface ChatRoomDto {
  id: number;
  title: string;
  chatRoomMembers: {memberId: number; memberNickname: string}[];
}

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdW5odWk5Nzg5QGdtYWlsLmNvbSIsImF1dGgiOiJVU0VSIiwibmlja25hbWUiOiLqtazspIDtnJgiLCJpZCI6MTEsImNvdW50cnkiOiJFTiIsInByb3ZpZGVyIjoic2VydmVyIiwiaWF0IjoxNzQxOTI5OTg2LCJleHAiOjE3NDE5MzM1ODZ9.E6qfcaa7oxc8YdR8UGEcINuJWU4azyYQIOsr-ksc6CA';

const CORE_API_BASE_URL = Config.CORE_API_BASE_URL;
type Navigation = DrawerNavigationProp<MainDrawerParamList>;

const ChatRoomScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [memberInfo, setMemberInfo] = useState<MemberInfoDto | null>(null);
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    fetchMemberInfo();
    fetchChatRooms();
  }, []);

  // 회원정보 조회
  const fetchMemberInfo = async () => {
    try {
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      const response = await axios.get<{data: {memberDto: MemberInfoDto}}>(
        `${CORE_API_BASE_URL}/api/v1/members`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const memberData = response.data.data.memberDto;
      if (!memberData) {
        console.error('memberDto가 응답에 없음:', response.data);
        return;
      }

      console.log('Fetched member data:', memberData);
      setMemberInfo(memberData);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get(
        `${CORE_API_BASE_URL}/api/v1/chat-room`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.returnCode === '0000') {
        setChatRooms(response.data.kloverPage.contents);
      } else {
        console.error(
          'Failed to fetch chat rooms:',
          response.data.returnMessage,
        );
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  const renderChatRoomItem = ({item}: {item: ChatRoomDto}) => {
    const members = item.chatRoomMembers.map(m => m.memberNickname);
    let chatTitle = item.title;

    if (!chatTitle) {
      if (members.length === 2) {
        // 멤버가 1명 남으면 그 멤버 이름 + '님'
        chatTitle = `${members[1]}님`;
      } else if (members.length > 2) {
        // 2명 이상이면 첫 번째 멤버 + '님 외 -명'
        chatTitle = `${members[1]}님 외 ${members.length - 1}명`;
      }
    }

    return (
      <TouchableOpacity style={styles.chatRoomCard}>
        <Image source={userDefaultImage} style={styles.profileImage} />
        <View style={styles.chatInfo}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {chatTitle}
          </Text>
          <Text style={styles.lastMessage}>최근 메시지</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <CustomIcon
            name="LeftLineSvg"
            size={24}
            onPress={navigation.goBack}
          />
          <Text style={styles.headerNickname}>
            {memberInfo?.nickname ?? '닉네임'}
          </Text>
          <CustomIcon
            name="EditLineSvg"
            size={24}
            onPress={navigation.goBack}
          />
        </View>
        <View style={styles.searchContainer}>
          <CustomIcon name="Search2LineSvg" size={24} />
          <TextInput
            style={styles.searchInput}
            placeholder="검색"
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
          />
        </View>
        <FlatList
          data={chatRooms}
          keyExtractor={item => item.id.toString()}
          renderItem={renderChatRoomItem}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 25,
    padding: 6,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  chatRoomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatInfo: {flex: 1},
  title: {fontSize: 16},
  lastMessage: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
});

export default ChatRoomScreen;
