import { GuideAccordionItemType, GuideListType } from "@/types/guide/guideType";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const IMAGE_MAP = {
  CAFETERIA: require("@/assets/images/cafeteria.png"),
  LIBRARY: require("@/assets/images/library.png"),
  DORMITORY: require("@/assets/images/dormitory.png"),
  HEALTH: require("@/assets/images/health.png"),
  TRANSPORT: require("@/assets/images/transport.png"),
  DOCUMENT: require("@/assets/images/document.png"),
};

function GuideAccordion({ section }: { section: GuideAccordionItemType }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const accordionIcon = isOpen
    ? require("../../../assets/images/top.png")
    : require("../../../assets/images/bottom.png");

  return (
    <View className="flex flex-col border-t border-[#F3F4F6] px-1">
      <Pressable
        className="flex w-full flex-row justify-between py-3"
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <Text className="text-[14px] font-bold text-[#101828]">
          {section.title}
        </Text>
        <Image source={accordionIcon} className="h-6 w-6" />
      </Pressable>
      {isOpen && (
        <View>
          <Text className="min-h-40 p-1 text-[13px] font-normal text-[#6A7282]">
            {section.content}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function GuideItem({ item }: { item: GuideListType }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const itemIcon = isOpen
    ? require("../../../assets/images/bottom.png")
    : require("../../../assets/images/next.png");

  return (
    <View className="rounded-2xl bg-[#ffffff] p-4">
      <Pressable
        className="flex flex-row items-center justify-between"
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <View className="flex flex-row items-center gap-4">
          <Image source={IMAGE_MAP[item.type]} className="h-16 w-16" />
          <View>
            <Text className="text-[15px] font-bold text-[#101828]">
              {item.title}
            </Text>
            <Text className="text-[12px] font-medium text-[#99A1AF]">
              {item.description}
            </Text>
          </View>
        </View>
        <Image source={itemIcon} className="h-8 w-8" />
      </Pressable>
      {isOpen && (
        <View className="mt-4">
          {item.sections.map((section) => (
            <GuideAccordion key={section.id} section={section} />
          ))}
        </View>
      )}
    </View>
  );
}
