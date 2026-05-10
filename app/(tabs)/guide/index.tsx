import GuideItem from "@/components/ui/guide/GuidItem";
import { Text, View } from "react-native";

export default function GuideScreen() {
  return (
    <View className="mx-auto mt-14 bg-[#F5F7F9]">
      <View className="min-w-dvw flex text-start px-4 py-2 bg-[#ffffff]">
        <Text className="text-[24px] font-bold ">생활 가이드</Text>
      </View>
      <View className=" min-w-full max-h-dvh">
        <Text className="text-[15px] font-normal text-[#6A7282] px-4 py-4">
          Campus Life Guide for International Students
        </Text>
        <View className="flex flex-col  gap-2">
          <GuideItem />
          <GuideItem />
          <GuideItem />
          <GuideItem />
        </View>
      </View>
    </View>
  );
}
