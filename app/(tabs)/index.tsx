import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="rounded-xl bg-black px-5 py-4">
        <Text className="text-2xl font-bold text-red-500">
          Tailwind is working
        </Text>
      </View>
    </View>
  );
}
