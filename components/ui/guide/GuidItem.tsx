import { GuidType } from "@/types/guide/guideType";
import { Image, Text, View } from "react-native";

const IMAGE_MAP = {
  CAFETERIA: require("@/assets/images/cafeteria.png"),
  LIBRARY: require("@/assets/images/library.png"),
  DORMITORY: require("@/assets/images/dormitory.png"),
  HEALTH: require("@/assets/images/health.png"),
  TRANSPORT: require("@/assets/images/transport.png"),
  DOCUMENT: require("@/assets/images/document.png"),
};

export default function GuideItem({ item }: { item: GuidType }) {
  return (
    <View className="rounded-2xl bg-[#ffffff] p-4">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-4">
          <Image source={IMAGE_MAP[item]} className="w-16 h-16" />
          <View>
            <Text className="text-[15px] font-bold text-[#101828]">
              식당 이용 안내
            </Text>
            <Text className="text-[12px] font-medium text-[#99A1AF]">
              학생식당 / 교직원식당 / 편의점
            </Text>
          </View>
        </View>
        <Image
          source={require("../../../assets/images/next.png")}
          className="w-8 h-8"
        />
      </View>
    </View>
  );
}
