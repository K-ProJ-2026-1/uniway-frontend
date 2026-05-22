import { Image, TextInput, View } from "react-native";

export default function Input() {
  return (
    <View className="shadow-[0px 2px 20px rgba(0, 0, 0, 0.12)] w-[360px] px-4 py-2 flex flex-row bg-[#FFFFFF] rounded-[16px] items-center gap-2">
      <Image
        source={require("../../assets/images/search.png")}
        className="w-5 h-5"
      />
      <TextInput className="w-full text-[#888888]" placeholder="시설 검색" />
    </View>
  );
}
