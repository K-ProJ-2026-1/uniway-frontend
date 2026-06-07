import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  buildMockMentorReply,
  getInitialChatMessages,
  getMockMentorProfile,
  getQuickChatPrompts,
} from "@/constants/chat/mockChat";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChatMessage } from "@/types/chat/chatType";

const IMAGE_MAP = {
  profile: require("@/assets/images/profile.png"),
  arrow: require("@/assets/images/arrow_white.png"),
  back: require("@/assets/images/back.png"),
};

function buildCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

export default function ChatRoomScreen() {
  const insets = useSafeAreaInsets();
  const { language, t } = useLanguage();
  const mentorProfile = useMemo(() => getMockMentorProfile(language), [language]);
  const quickPrompts = useMemo(() => getQuickChatPrompts(language), [language]);
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    getInitialChatMessages(language),
  );
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setMessages(getInitialChatMessages(language));
    setInputText("");
  }, [language]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  const appendMessage = (message: ChatMessage) => {
    setMessages((current) => [...current, message]);
  };

  const sendMessage = (rawText: string) => {
    const trimmedText = rawText.trim();

    if (!trimmedText) {
      return;
    }

    const myMessage: ChatMessage = {
      id: `me-${Date.now()}`,
      sender: "me",
      senderName: language === "ko" ? "나" : language === "en" ? "Me" : "我",
      text: trimmedText,
      time: buildCurrentTime(),
    };

    appendMessage(myMessage);
    setInputText("");

    replyTimeoutRef.current = setTimeout(() => {
      appendMessage({
        id: `mentor-${Date.now()}`,
        sender: "mentor",
        senderName: mentorProfile.roleLabel,
        text: buildMockMentorReply(trimmedText, language),
        time: buildCurrentTime(),
      });
    }, 650);
  };

  const handleSend = () => {
    sendMessage(inputText);
  };

  const renderItem = ({ item }: { item: ChatMessage }) => {
    if (item.sender === "system") {
      return (
        <View className="mb-5 items-center px-5">
          <View className="rounded-full bg-[#E8F4E4] px-4 py-2">
            <Text className="text-[12px] font-medium text-[#4D8E4B]">{item.text}</Text>
          </View>
        </View>
      );
    }

    const isMe = item.sender === "me";

    if (isMe) {
      return (
        <View className="mb-5 flex-row items-end justify-end px-5">
          <Text className="mb-1 mr-2 text-[10px] text-gray-400">{item.time}</Text>
          <View className="max-w-[72%] rounded-bl-2xl rounded-br-2xl rounded-tl-2xl rounded-tr-sm bg-green-600 px-4 py-3 shadow-sm">
            <Text className="text-base leading-6 text-white">{item.text}</Text>
          </View>
        </View>
      );
    }

    return (
      <View className="mb-5 flex-row items-start px-5">
        <Image
          source={IMAGE_MAP.profile}
          className="mr-3 mt-1 h-8 w-8 rounded-full"
          resizeMode="cover"
        />

        <View className="max-w-[72%]">
          <Text className="mb-1 pl-1 text-xs font-medium text-gray-600">
            {item.senderName}
          </Text>
          <View className="flex-row items-end">
            <View className="rounded-bl-2xl rounded-br-2xl rounded-tl-sm rounded-tr-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <Text className="text-base leading-6 text-slate-800">{item.text}</Text>
            </View>
            <Text className="mb-1 ml-2 text-[10px] text-gray-400">{item.time}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-neutral-100">
      <View
        className="z-10 w-full flex-row items-center border-b border-gray-100 bg-white/90 px-4 pb-3 shadow-sm"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Pressable
          onPress={() => router.back()}
          className="mr-4 h-8 w-8 items-center justify-center rounded-2xl bg-gray-200"
        >
          <Image source={IMAGE_MAP.back} className="h-7 w-7" resizeMode="contain" />
        </Pressable>

        <View className="flex-1 flex-row items-center">
          <Image
            source={IMAGE_MAP.profile}
            className="h-10 w-10 rounded-full"
            resizeMode="cover"
          />
          <View className="ml-3">
            <Text className="text-base font-bold leading-5 text-gray-900">
              {mentorProfile.name}
            </Text>
            <View className="mt-0.5 flex-row items-center">
              <Text className="text-[11px] font-medium text-gray-500">
                {mentorProfile.department}
              </Text>
              <View className="ml-2 rounded-full bg-[#E8F4E4] px-2 py-0.5">
                <Text className="text-[10px] font-semibold text-[#4D8E4B]">
                  {mentorProfile.statusLabel}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.top + 12}
        className="flex-1"
      >
        <View className="border-b border-[#F0F2F4] bg-white px-4 pb-3 pt-2">
          <Text className="text-[12px] font-semibold text-[#6B7280]">
            {t("chat.mentorTopics")}
          </Text>
          <View className="mt-2 flex-row flex-wrap">
            {mentorProfile.topics.map((topic) => (
              <View
                key={topic}
                className="mb-2 mr-2 rounded-full bg-[#EEF4E9] px-3 py-1.5"
              >
                <Text className="text-[12px] font-medium text-[#4D8E4B]">#{topic}</Text>
              </View>
            ))}
          </View>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        />

        <View
          className="w-full border-t border-gray-100 bg-white px-4 pt-3 shadow-lg"
          style={{ paddingBottom: Math.max(insets.bottom, 10) }}
        >
          <Text className="mb-2 text-[12px] font-semibold text-[#6B7280]">
            {t("chat.quickAsk")}
          </Text>
          <View className="mb-3 flex-row flex-wrap">
            {quickPrompts.map((prompt) => (
              <Pressable
                key={prompt}
                onPress={() => sendMessage(prompt)}
                className="mb-2 mr-2 rounded-full bg-[#F5F7F9] px-3 py-2"
              >
                <Text className="text-[12px] font-medium text-[#4B5563]">{prompt}</Text>
              </Pressable>
            ))}
          </View>

          <View className="h-12 flex-row items-center justify-between rounded-full bg-neutral-100 px-4">
            <TextInput
              className="h-full flex-1 pr-2 text-base text-black"
              placeholder={t("chat.placeholder")}
              placeholderTextColor="#9ca3af"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Pressable
              onPress={handleSend}
              className={`h-8 w-8 items-center justify-center rounded-full ${
                inputText.trim() ? "bg-green-600" : "bg-gray-200"
              }`}
            >
              <Image source={IMAGE_MAP.arrow} className="h-4 w-4" resizeMode="contain" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
