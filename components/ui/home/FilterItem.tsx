import { Text, View } from "react-native";

export default function FilterItem({
  text,
  isSelected,
}: {
  text: string;
  isSelected: boolean;
}) {
  const bagColor = isSelected ? "bg-[#4FA253]" : "bg-[#ffffff]";
  const textColor = isSelected ? "text-[#FFFFFF]" : "text-[#3D3D3D]";

  return (
    <View
      className={`${bagColor} rounded-[100px] py-2 px-4 shadow-[0px 2px 10px rgba(79, 162, 83, 0.32);]`}
    >
      <Text className={`text-[13px] font-medium ${textColor}`}>{text}</Text>
    </View>
  );
}
