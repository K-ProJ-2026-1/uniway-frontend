import { Image, TouchableOpacity, View } from "react-native";

export default function ControlButtons() {
  return (
    <View className="absolute right-4 top-32 flex-col items-center gap-2">
      <TouchableOpacity className="w-11 h-11 rounded-[12px] bg-white items-center justify-center shadow-[0px 2px 14px rgba(0,0,0,0.13)]">
        <Image
          source={require("../../assets/images/plus.png")}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity className="w-11 h-11 rounded-[12px] bg-white items-center justify-center shadow-[0px 2px 14px rgba(0,0,0,0.06)]">
        <Image
          source={require("../../assets/images/minus.png")}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity className="w-11 h-11 rounded-[12px] bg-[#4FA253] items-center justify-center shadow-[0px 2px 14px rgba(0,0,0,0.13)]">
        <Image
          source={require("../../assets/images/arrow_white.png")}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
