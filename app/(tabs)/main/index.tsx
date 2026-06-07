import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NativeMapView, { Marker as NativeMarker } from "@/components/map/NativeMap";
import { CAMPUS_PLACES, PLACE_FILTERS } from "@/constants/map/places";
import {
  getFilterLabel,
  localizeText,
  localizeTextList,
} from "@/constants/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import { CampusPlace, PlaceFilter } from "@/types/map/placeType";

type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type LabelPoint = {
  x: number;
  y: number;
};

type MapOnlyMarker = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  kind: "building" | "shuttle";
};

const LOCATION_ICON = require("@/assets/images/loaction.png");

const INITIAL_REGION: MapRegion = {
  latitude: 37.27633,
  longitude: 127.132404,
  latitudeDelta: 0.0066,
  longitudeDelta: 0.0066,
};

const MAP_ONLY_MARKERS: MapOnlyMarker[] = [
  {
    id: "shuttle-1",
    name: "\uC154\uD2C0 \uC815\uB958\uC18C",
    latitude: 37.274709,
    longitude: 127.130778,
    kind: "shuttle",
  },
  {
    id: "shuttle-2",
    name: "\uC154\uD2C0 \uC815\uB958\uC18C",
    latitude: 37.275132,
    longitude: 127.130985,
    kind: "shuttle",
  },
  {
    id: "shuttle-3",
    name: "\uC154\uD2C0 \uC815\uB958\uC18C",
    latitude: 37.275985,
    longitude: 127.133903,
    kind: "shuttle",
  },
  {
    id: "shuttle-4",
    name: "\uC154\uD2C0 \uC815\uB958\uC18C",
    latitude: 37.27675,
    longitude: 127.134511,
    kind: "shuttle",
  },
];

const MARKER_LABEL_WIDTH = 108;

function MapBackdrop({ language }: { language: "ko" | "en" | "zh" }) {
  const getPlaceName = (placeId: string) => {
    const place = CAMPUS_PLACES.find((item) => item.id === placeId) ?? CAMPUS_PLACES[0];
    return localizeText(place.name, language);
  };

  return (
    <View className="absolute inset-0 overflow-hidden bg-[#EEF4E9]">
      <View className="absolute left-[-8%] top-[18%] h-[52%] w-[92%] rounded-[999px] bg-[#DCE8F5]" />
      <View className="absolute right-[-18%] top-[32%] h-[60%] w-[78%] rounded-[999px] bg-[#DDEAC8]" />
      <View className="absolute left-[22%] top-[30%] h-[18%] w-[34%] rounded-[28px] bg-[#CFE1F6]" />
      <View className="absolute left-[39%] top-[52%] h-[9%] w-[12%] rounded-[16px] bg-[#ABD0F6]" />

      <View className="absolute left-[-2%] top-[8%] h-[3px] w-[46%] rotate-[10deg] rounded-full bg-[#FFFFFF]" />
      <View className="absolute left-[8%] top-[19%] h-[3px] w-[54%] rotate-[-18deg] rounded-full bg-[#FFFFFF]" />
      <View className="absolute left-[2%] top-[33%] h-[3px] w-[64%] rotate-[14deg] rounded-full bg-[#FFFFFF]" />
      <View className="absolute left-[18%] top-[44%] h-[3px] w-[52%] rotate-[-12deg] rounded-full bg-[#FFFFFF]" />
      <View className="absolute left-[12%] top-[62%] h-[3px] w-[48%] rotate-[8deg] rounded-full bg-[#FFFFFF]" />
      <View className="absolute left-[5%] top-[74%] h-[3px] w-[44%] rotate-[-16deg] rounded-full bg-[#FFFFFF]" />

      <View className="absolute left-[64%] top-[10%] h-[18%] w-[2px] rounded-full border-r-2 border-dashed border-[#7AAF62]" />
      <View className="absolute left-[57%] top-[21%] h-[14%] w-[2px] rounded-full border-r-2 border-dashed border-[#7AAF62]" />

      <Text className="absolute left-[71%] top-[11%] text-[11px] text-[#7C879A]">
        {getPlaceName("simjeon")}
      </Text>
      <Text className="absolute left-[64%] top-[16%] text-[11px] text-[#7C879A]">
        {getPlaceName("engineering")}
      </Text>
      <Text className="absolute left-[68%] top-[30%] text-[11px] text-[#7C879A]">
        {getPlaceName("gyeongcheon")}
      </Text>
      <Text className="absolute left-[52%] top-[36%] text-[11px] text-[#7C879A]">
        {getPlaceName("library")}
      </Text>
      <Text className="absolute left-[40%] top-[41%] text-[11px] text-[#7C879A]">
        {getPlaceName("centralLibrary")}
      </Text>
      <Text className="absolute left-[62%] top-[49%] text-[11px] text-[#7C879A]">
        {getPlaceName("main")}
      </Text>
      <Text className="absolute left-[32%] top-[54%] text-[11px] text-[#7C879A]">
        {getPlaceName("uwon")}
      </Text>
      <Text className="absolute left-[71%] top-[57%] text-[11px] text-[#7C879A]">
        {getPlaceName("cheoneun")}
      </Text>
      <Text className="absolute left-[18%] top-[51%] text-[11px] text-[#7C879A]">
        {getPlaceName("shalom")}
      </Text>
      <Text className="absolute left-[24%] top-[62%] text-[11px] text-[#7C879A]">
        {getPlaceName("humanities")}
      </Text>
      <Text className="absolute left-[20%] top-[32%] text-[11px] text-[#7C879A]">
        {getPlaceName("arts")}
      </Text>
    </View>
  );
}

function clampDelta(delta: number) {
  return Math.max(0.002, Math.min(delta, 0.05));
}

function buildRegion(
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
): MapRegion {
  return {
    latitude,
    longitude,
    latitudeDelta: clampDelta(latitudeDelta),
    longitudeDelta: clampDelta(longitudeDelta),
  };
}

export default function MainScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { language, t } = useLanguage();
  const mapRef = useRef<any>(null);
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState(INITIAL_REGION);
  const [selectedPlaceId, setSelectedPlaceId] = useState("gyeongcheon");
  const [activeFilter, setActiveFilter] = useState<PlaceFilter>("전체");
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [labelPoints, setLabelPoints] = useState<Record<string, LabelPoint>>(
    {},
  );

  const keyword = searchText.trim().toLowerCase();
  const placesByFilter =
    activeFilter === "전체"
      ? CAMPUS_PLACES
      : CAMPUS_PLACES.filter((item) => item.category === activeFilter);
  const filteredResults = keyword
    ? placesByFilter.filter(
        (item) =>
          Object.values(item.name).some((value) =>
            value.toLowerCase().includes(keyword),
          ) ||
          Object.values(item.subtitle).some((value) =>
            value.toLowerCase().includes(keyword),
          ),
      )
    : placesByFilter;
  const selectedPlace =
    CAMPUS_PLACES.find((place) => place.id === selectedPlaceId) ??
    CAMPUS_PLACES[0];

  const showSearchResults = keyword.length > 0;

  const focusRegion = (nextRegion: MapRegion) => {
    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, 250);
  };

  const detailCardBottom = 0;

  const focusPlace = (place: CampusPlace, showDetail = true) => {
    setSelectedPlaceId(place.id);
    setIsDetailVisible(showDetail);
    focusRegion(
      buildRegion(
        place.latitude,
        place.longitude,
        region.latitudeDelta,
        region.longitudeDelta,
      ),
    );
  };

  const handleZoom = (direction: "in" | "out") => {
    const multiplier = direction === "in" ? 0.6 : 1.6;

    focusRegion(
      buildRegion(
        region.latitude,
        region.longitude,
        region.latitudeDelta * multiplier,
        region.longitudeDelta * multiplier,
      ),
    );
  };

  const handleReset = () => {
    setActiveFilter("전체");
    setSelectedPlaceId("gyeongcheon");
    setIsDetailVisible(false);
    setSearchText("");
    focusRegion(INITIAL_REGION);
  };

  const handleSelectFilter = (filter: PlaceFilter) => {
    setActiveFilter(filter);

    const nextPlaces =
      filter === "전체"
        ? CAMPUS_PLACES
        : CAMPUS_PLACES.filter((place) => place.category === filter);

    if (nextPlaces.length === 0) {
      return;
    }

    if (!nextPlaces.some((place) => place.id === selectedPlaceId)) {
      focusPlace(nextPlaces[0], false);
    }
  };

  useEffect(() => {
    if (
      !mapReady ||
      !mapRef.current ||
      mapSize.width === 0 ||
      mapSize.height === 0
    ) {
      return;
    }

    if (filteredResults.length === 0) {
      setLabelPoints({});
      return;
    }

    let cancelled = false;

    const syncLabelPoints = async () => {
      const nextEntries = await Promise.all(
        filteredResults.map(async (place) => {
          try {
            const point = await mapRef.current?.pointForCoordinate({
              latitude: place.latitude,
              longitude: place.longitude,
            });

            if (!point) {
              return null;
            }

            return [place.id, point] as const;
          } catch {
            return null;
          }
        }),
      );

      if (cancelled) {
        return;
      }

      setLabelPoints(
        Object.fromEntries(
          nextEntries.filter(
            (entry): entry is readonly [string, LabelPoint] => entry !== null,
          ),
        ),
      );
    };

    void syncLabelPoints();

    return () => {
      cancelled = true;
    };
  }, [activeFilter, keyword, mapReady, mapSize.height, mapSize.width, region]);

  const renderMarkerLabels = () => {
    if (!NativeMapView) {
      return null;
    }

    return (
      <View pointerEvents="box-none" style={styles.markerLabelLayer}>
        {filteredResults.map((place) => {
          const point = labelPoints[place.id];

          if (!point) {
            return null;
          }

          const isVisible =
            point.x > -MARKER_LABEL_WIDTH &&
            point.x < mapSize.width + MARKER_LABEL_WIDTH &&
            point.y > -80 &&
            point.y < mapSize.height + 40;

          if (!isVisible) {
            return null;
          }

          const isSelected = selectedPlaceId === place.id;

          return (
            <Pressable
              key={place.id}
              onPress={() => focusPlace(place)}
              style={[
                styles.floatingLabel,
                {
                  left: point.x - MARKER_LABEL_WIDTH / 2,
                  top: point.y - 50,
                },
                isSelected && styles.floatingLabelActive,
              ]}
            >
              <Text
                style={[
                  styles.floatingLabelText,
                  isSelected && styles.floatingLabelTextActive,
                ]}
                numberOfLines={1}
              >
                {localizeText(place.name, language)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  const renderMap = () => {
    if (!NativeMapView || !NativeMarker) {
      return <MapBackdrop language={language} />;
    }

    return (
      <NativeMapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        onRegionChangeComplete={(nextRegion: MapRegion) =>
          setRegion(nextRegion)
        }
        onMapReady={() => setMapReady(true)}
        showsBuildings
        showsCompass={false}
        showsIndoorLevelPicker
      >
        {filteredResults.map((place) => {
          const isSelected = selectedPlaceId === place.id;

          return (
            <NativeMarker
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              title={localizeText(place.name, language)}
              description={localizeText(place.subtitle, language)}
              anchor={{ x: 0.5, y: 0.5 }}
              onPress={() => focusPlace(place)}
            >
              <View
                style={[styles.markerPin, isSelected && styles.markerPinActive]}
              >
                <Ionicons
                  name="location-sharp"
                  size={17}
                  color={isSelected ? "#FFFFFF" : "#58AF55"}
                />
              </View>
            </NativeMarker>
          );
        })}
        {MAP_ONLY_MARKERS.map((marker) => (
          <NativeMarker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View
              style={[
                styles.markerPin,
                marker.kind === "shuttle"
                  ? styles.markerPinShuttle
                  : styles.markerPinMapOnly,
              ]}
            >
              <Ionicons
                name={
                  marker.kind === "shuttle" ? "bus-outline" : "location-sharp"
                }
                size={17}
                color="#FFFFFF"
              />
            </View>
          </NativeMarker>
        ))}
      </NativeMapView>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
      style={styles.container}
    >
      <View
        className="flex-1 bg-[#EEF4E9]"
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setMapSize((current) =>
            current.width === width && current.height === height
              ? current
              : { width, height },
          );
        }}
      >
        {renderMap()}
        {renderMarkerLabels()}

        <View
          pointerEvents="box-none"
          className="absolute left-0 right-0 px-4"
          style={{ top: insets.top + 14 }}
        >
          <View className="rounded-[24px] border border-[#ECECEC] bg-white px-4 py-3 shadow-sm">
            <View className="flex-row items-center">
              <Ionicons name="search-outline" size={22} color="#9AA0AA" />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder={t("main.searchPlaceholder")}
                placeholderTextColor="#9AA0AA"
                className="ml-2 flex-1 py-0 text-[17px] text-[#262931]"
              />
              {searchText.length > 0 && (
                <Pressable
                  onPress={() => setSearchText("")}
                  className="h-8 w-8 items-center justify-center rounded-full bg-[#F1EFEA]"
                >
                  <Ionicons name="close" size={18} color="#7C7A75" />
                </Pressable>
              )}
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {PLACE_FILTERS.map((filter) => {
              const isSelected = activeFilter === filter;

              return (
                <Pressable
                  key={filter}
                  onPress={() => handleSelectFilter(filter)}
                  className={`mr-2 rounded-full px-4 py-2.5 ${
                    isSelected ? "bg-[#58AF55]" : "bg-white"
                  }`}
                  style={
                    isSelected ? styles.filterChipActive : styles.filterChip
                  }
                >
                  <Text
                    className={`text-[14px] font-semibold ${
                      isSelected ? "text-white" : "text-[#3E444F]"
                    }`}
                  >
                    {getFilterLabel(filter, language)}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {showSearchResults && (
            <View className="mt-3 rounded-[30px] bg-white px-4 py-3 shadow-lg">
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 2 }}
                keyboardShouldPersistTaps="handled"
              >
                {filteredResults.map((item, index) => (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      focusPlace(item);
                      setSearchText("");
                    }}
                    className={`${index > 0 ? "mt-6" : ""} flex-row items-start`}
                  >
                    <View className="mr-4 h-12 w-12 items-center justify-center rounded-[16px] bg-[#DDF0D7]">
                      <Image
                        source={LOCATION_ICON}
                        className="h-6 w-6"
                        resizeMode="contain"
                      />
                    </View>

                    <View className="flex-1 pt-0.5">
                      <Text className="text-[17px] font-bold text-[#12141A]">
                        {localizeText(item.name, language)}
                      </Text>
                      <Text className="mt-1 text-[14px] font-medium text-[#A0A3AB]">
                        {localizeText(item.subtitle, language)}
                      </Text>
                    </View>
                  </Pressable>
                ))}

                {filteredResults.length === 0 && (
                  <View className="py-8">
                    <Text className="text-center text-[14px] text-[#98A2B3]">
                      {t("main.noResults")}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>

        <View
          pointerEvents="box-none"
          className="absolute right-4 items-center gap-3"
          style={{
            bottom: tabBarHeight + 2,
          }}
        >
          <Pressable
            onPress={() => handleZoom("in")}
            className="h-14 w-14 items-center justify-center rounded-[18px] bg-white shadow-lg"
          >
            <Ionicons name="add" size={28} color="#2E313A" />
          </Pressable>
          <Pressable
            onPress={() => handleZoom("out")}
            className="h-14 w-14 items-center justify-center rounded-[18px] bg-white shadow-lg"
          >
            <Ionicons name="remove" size={28} color="#2E313A" />
          </Pressable>
          <Pressable
            onPress={handleReset}
            className="h-14 w-14 items-center justify-center rounded-[18px] bg-[#58AF55] shadow-lg"
          >
            <Ionicons name="navigate-outline" size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        {isDetailVisible && (
          <View
            className="absolute left-4 right-4 rounded-[32px] bg-white px-5 pb-5 pt-4"
            style={[
              styles.detailCard,
              {
                bottom: detailCardBottom,
              },
            ]}
          >
            <View className="items-center">
              <View className="h-1.5 w-12 rounded-full bg-[#E6E1D8]" />
            </View>

            <View className="mt-4 flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <View className="self-start rounded-full bg-[#DDF3D4] px-3 py-1">
                  <Text className="text-[12px] font-semibold text-[#58AF55]">
                    {getFilterLabel(selectedPlace.category, language)}
                  </Text>
                </View>
                <Text className="mt-3 text-[28px] font-bold text-[#111827]">
                  {localizeText(selectedPlace.name, language)}
                </Text>
              </View>

              <Pressable
                onPress={() => setIsDetailVisible(false)}
                className="h-10 w-10 items-center justify-center rounded-full bg-[#F5F1EA]"
              >
                <Ionicons name="close" size={20} color="#6F6A63" />
              </Pressable>
            </View>

            <View className="mt-4 flex-row gap-3">
              <View className="flex-1 rounded-[18px] bg-[#F7F4EF] px-4 py-3">
                <View className="flex-row items-center">
                  <Ionicons name="location-outline" size={14} color="#58AF55" />
                  <Text className="ml-1 text-[12px] font-medium text-[#8B8F97]">
                    {t("main.location")}
                  </Text>
                </View>
                <Text className="mt-2 text-[14px] font-semibold leading-5 text-[#31353D]">
                  {localizeText(selectedPlace.location, language)}
                </Text>
              </View>

              <View className="flex-1 rounded-[18px] bg-[#F7F4EF] px-4 py-3">
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#58AF55" />
                  <Text className="ml-1 text-[12px] font-medium text-[#8B8F97]">
                    {t("main.hours")}
                  </Text>
                </View>
                <Text className="mt-2 text-[14px] font-semibold leading-5 text-[#31353D]">
                  {localizeText(selectedPlace.hours, language)}
                </Text>
              </View>
            </View>

            <Text className="mt-4 text-[14px] leading-6 text-[#4B5563]">
              {localizeText(selectedPlace.description, language)}
            </Text>

            <View className="mt-4 flex-row flex-wrap">
              {localizeTextList(selectedPlace.tags, language).map((tag) => (
                <View
                  key={tag}
                  className="mb-2 mr-2 rounded-full bg-[#F3EEE7] px-3 py-1.5"
                >
                  <Text className="text-[12px] font-medium text-[#706A64]">
                    #{tag}
                  </Text>
                </View>
              ))}
            </View>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/main/[placeId]",
                  params: { placeId: selectedPlace.id },
                })
              }
              className="mt-3 h-14 flex-row items-center justify-center rounded-[18px] bg-[#58AF55]"
            >
              <Text className="text-[16px] font-bold text-white">
                {t("main.viewDetails")}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#FFFFFF"
                style={styles.ctaIcon}
              />
            </Pressable>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerLabelLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  markerPin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderWidth: 1,
    borderColor: "#D7E4D1",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  markerPinActive: {
    backgroundColor: "#58AF55",
    borderColor: "#58AF55",
  },
  markerPinMapOnly: {
    backgroundColor: "#7C879A",
    borderColor: "#7C879A",
  },
  markerPinShuttle: {
    backgroundColor: "#4477D8",
    borderColor: "#4477D8",
  },
  floatingLabel: {
    position: "absolute",
    width: MARKER_LABEL_WIDTH,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#D7DDE7",
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  floatingLabelActive: {
    backgroundColor: "#58AF55",
    borderColor: "#58AF55",
  },
  floatingLabelText: {
    color: "#1F2937",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
  floatingLabelTextActive: {
    color: "#FFFFFF",
  },
  filterRow: {
    paddingTop: 12,
    paddingRight: 8,
  },
  filterChip: {
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  filterChipActive: {
    shadowColor: "#58AF55",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  detailCard: {
    shadowColor: "#111827",
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  ctaIcon: {
    marginLeft: 6,
  },
});
