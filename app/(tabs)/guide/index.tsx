import GuideItem from "@/components/ui/guide/GuidItem";
import { GUIDE_LIST } from "@/constants/guide";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ScrollView, Text, View } from "react-native";

export default function GuideScreen() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View className="mx-auto flex-1 bg-[#F5F7F9] pt-10">
      <View className="min-w-dvw bg-[#ffffff] px-6 py-2">
        <Text className="text-[24px] font-bold">생활 가이드</Text>
      </View>
      <ScrollView
        className="min-w-full flex-1 px-4"
        contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
      >
        <Text className="px-4 py-4 text-[15px] font-normal text-[#6A7282]">
          Campus Life Guide for International Students
        </Text>
        <View className="flex flex-col gap-3">
          {GUIDE_LIST.map((item) => (
            <GuideItem item={item} key={item.id} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
