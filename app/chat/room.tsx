import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const IMAGE_MAP = {
  profile: require("@/assets/images/profile.png"),
  arrow: require("@/assets/images/arrow_white.png"),
  back: require("@/assets/images/back.png"),
};

// 테스트용 초기 채팅 데이터
const INITIAL_MESSAGES = [
  {
    id: "1",
    sender: "mentor",
    senderName: "김민수 멘토",
    text: "안녕하세요! 멘토 김민수입니다. 궁금한 점이 있으면 언제든지 물어보세요 😊",
    time: "10:30",
  },
  {
    id: "2",
    sender: "me",
    senderName: "나",
    text: "안녕하세요! 도서관 이용 시간이 어떻게 되나요?",
    time: "10:32",
  },
  {
    id: "3",
    sender: "mentor",
    senderName: "김민수 멘토",
    text: "중앙도서관은 24시간 운영됩니다. 하지만 주말에는 밤 10시까지만 열어요.",
    time: "10:33",
  },
  {
    id: "4",
    sender: "me",
    senderName: "나",
    text: "학생증으로 출입하면 되나요?",
    time: "10:35",
  },
  {
    id: "5",
    sender: "mentor",
    senderName: "김민수 멘토",
    text: "네 맞아요! 학생증을 카드 리더기에 태그하면 됩니다.",
    time: "10:36",
  },
];

export default function ChatRoomScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");

  // 메시지 전송 함수
  const handleSend = () => {
    if (inputText.trim() === "") return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const newMessage = {
      id: String(messages.length + 1),
      sender: "me",
      senderName: "나",
      text: inputText,
      time: `${hours}:${minutes}`,
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  // 말풍선 렌더링 함수
  const renderItem = ({ item }: { item: (typeof INITIAL_MESSAGES)[0] }) => {
    const isMe = item.sender === "me";

    if (isMe) {
      // 내 메시지 (오른쪽 정렬, 초록색 배경)
      return (
        <View className="flex-row justify-end items-end mb-5 px-5">
          <Text className="text-gray-400 text-[10px] mr-2 mb-1">
            {item.time}
          </Text>
          <View className="max-w-[70%] bg-green-600 px-4 py-3 rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl shadow-sm">
            <Text className="text-white text-base leading-6">{item.text}</Text>
          </View>
        </View>
      );
    }

    // 멘토 메시지 (왼쪽 정렬, 흰색 배경 + 아바타)
    return (
      <View className="flex-row items-start mb-5 px-5">
        {/* 아바타 영역 */}
        <Image
          source={IMAGE_MAP.profile}
          className="w-8 h-8 rounded-full mr-3 mt-1"
          resizeMode="cover"
        />

        {/* 메시지 내용 */}
        <View className="max-w-[70%]">
          <Text className="text-gray-600 text-xs font-medium mb-1 pl-1">
            {item.senderName}
          </Text>
          <View className="flex-row items-end">
            <View className="bg-white px-4 py-3 rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl border border-gray-100 shadow-sm">
              <Text className="text-slate-800 text-base leading-6">
                {item.text}
              </Text>
            </View>
            <Text className="text-gray-400 text-[10px] ml-2 mb-1">
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-neutral-100">
      {/* 상단 상단 네비게이션 헤더 바 */}
      <View className="w-full pt-20 pb-3 px-4 bg-white/90 border-b border-gray-100 flex-row items-center shadow-sm z-10">
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-8 h-8 items-center justify-center mr-4 bg-gray-200 rounded-2xl "
        >
          <Image
            source={IMAGE_MAP.back}
            className="w-7 h-7"
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* 헤더 멘토 프로필 정보 */}
        <View className="flex-row items-center flex-1">
          <View>
            <Image
              source={IMAGE_MAP.profile}
              className="w-10 h-10 rounded-full"
              resizeMode="cover"
            />
          </View>
          <View className="ml-3">
            <Text className="text-gray-900 text-base font-bold leading-5">
              김민수
            </Text>
            <Text className="text-gray-500 text-[11px] font-medium mt-0.5">
              컴퓨터공학과 3학년
            </Text>
          </View>
        </View>
      </View>

      {/* 키보드 대응 래퍼 및 채팅 리스트 영역 */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={insets.top + 12}
          className="flex-1"
        >
        {/* 채팅 내역 리스트 */}
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />

        {/* 하단 메시지 입력 바 */}
        <View className="w-full px-4 py-3 mb-1 bg-white border-t border-gray-100 shadow-lg">
          <View className="w-full h-12 px-4 bg-neutral-100 rounded-full flex-row items-center justify-between">
            <TextInput
              className="flex-1 h-full text-base text-black pr-2"
              placeholder="메시지 보내기..."
              placeholderTextColor="#9ca3af"
              value={inputText}
              onChangeText={setInputText}
            />
            {/* 전송 버튼 */}
            <TouchableOpacity
              onPress={handleSend}
              className={`w-8 h-8 rounded-full items-center justify-center ${
                inputText.trim() ? "bg-green-600" : "bg-gray-200"
              }`}
            >
              {/* 전송 화살표 모양 심플 아이콘 */}
              <Image
                source={IMAGE_MAP.arrow}
                className="w-4 h-4"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
