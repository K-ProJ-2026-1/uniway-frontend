import { Image, Text, View } from "react-native";

export default function GuideItem() {
  return (
    <>
      <View className="flex  flex-row items-center gap-4">
        <View>
          <Image
            source={require("../../../assets/images/cafeteria.png")}
            className="w-20 h-20"
          />
        </View>
        <View>
          <Text>식당 이용 안내</Text>
          <Text>학생식당 / 교직원식당 / 편의점</Text>
        </View>
      </View>
    </>
  );
}
