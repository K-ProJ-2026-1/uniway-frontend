import FilterItem from "@/components/ui/home/FilterItem";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { View } from "react-native";

export default function MainScreen() {
  const [filter, setFilter] = useState("전체");

  return (
    <View className="mx-auto flex-1 pt-10">
      <Input />
      <View className="flex flex-row mt-2 gap-2">
        <FilterItem text={"전체"} isSelected={filter === "전체"} />
        <FilterItem text={"강의동"} isSelected={filter === "강의동"} />
        <FilterItem text={"도서관"} isSelected={filter === "도서관"} />
        <FilterItem text={"식당"} isSelected={filter === "식당"} />
        <FilterItem text={"기숙사"} isSelected={filter === "기숙사"} />
      </View>
    </View>
  );
}
