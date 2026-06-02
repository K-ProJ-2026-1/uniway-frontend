import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
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

type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type SearchPlace = {
  id: string;
  name: string;
  subtitle: string;
  latitude: number;
  longitude: number;
};

type LabelPoint = {
  x: number;
  y: number;
};

const LOCATION_ICON = require("@/assets/images/loaction.png");

const INITIAL_REGION: MapRegion = {
  latitude: 37.276074,
  longitude: 127.133255,
  latitudeDelta: 0.0055,
  longitudeDelta: 0.0055,
};

const SEARCH_RESULTS: SearchPlace[] = [
  {
    id: "shalom",
    name: "샬롬관",
    subtitle: "강남대학교 샬롬관",
    latitude: 37.274895,
    longitude: 127.130038,
  },
  {
    id: "humanities",
    name: "인문사회관",
    subtitle: "강남대학교 인문사회관",
    latitude: 37.275462,
    longitude: 127.130885,
  },
  {
    id: "arts",
    name: "예술관",
    subtitle: "강남대학교 예술관",
    latitude: 37.276184,
    longitude: 127.130793,
  },
  {
    id: "library",
    name: "중앙도서관",
    subtitle: "강남대학교 중앙도서관",
    latitude: 37.276606,
    longitude: 127.132171,
  },
  {
    id: "engineering",
    name: "이공관",
    subtitle: "강남대학교 이공관",
    latitude: 37.277141,
    longitude: 127.134037,
  },
  {
    id: "simjeon",
    name: "심전관",
    subtitle: "강남대학교 심전관",
    latitude: 37.278025,
    longitude: 127.134796,
  },
  {
    id: "main",
    name: "본관",
    subtitle: "강남대학교 본관",
    latitude: 37.276074,
    longitude: 127.133255,
  },
  {
    id: "gyeongcheon",
    name: "경천관",
    subtitle: "강남대학교 경천관",
    latitude: 37.276539,
    longitude: 127.134004,
  },
  {
    id: "cheoneun",
    name: "천은관",
    subtitle: "강남대학교 천은관",
    latitude: 37.275799,
    longitude: 127.134306,
  },
];

// react-native-maps is only used on native because Expo web does not support it.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mapsModule = Platform.OS === "web" ? null : require("react-native-maps");
const NativeMapView = mapsModule?.default;
const NativeMarker = mapsModule?.Marker;
const MARKER_LABEL_WIDTH = 108;

function MapBackdrop() {
  return (
    <View className="absolute inset-0 overflow-hidden bg-[#EEF1E9]">
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

      <Text className="absolute left-[71%] top-[11%] text-[11px] text-[#7C879A]">심전관</Text>
      <Text className="absolute left-[64%] top-[16%] text-[11px] text-[#7C879A]">이공관</Text>
      <Text className="absolute left-[68%] top-[30%] text-[11px] text-[#7C879A]">경천관</Text>
      <Text className="absolute left-[47%] top-[39%] text-[11px] text-[#7C879A]">중앙도서관</Text>
      <Text className="absolute left-[62%] top-[49%] text-[11px] text-[#7C879A]">본관</Text>
      <Text className="absolute left-[71%] top-[57%] text-[11px] text-[#7C879A]">천은관</Text>
      <Text className="absolute left-[18%] top-[51%] text-[11px] text-[#7C879A]">샬롬관</Text>
      <Text className="absolute left-[24%] top-[62%] text-[11px] text-[#7C879A]">인문사회관</Text>
      <Text className="absolute left-[20%] top-[32%] text-[11px] text-[#7C879A]">예술관</Text>
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
  const mapRef = useRef<any>(null);
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState(INITIAL_REGION);
  const [selectedPlaceId, setSelectedPlaceId] = useState("main");
  const [mapReady, setMapReady] = useState(false);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [labelPoints, setLabelPoints] = useState<Record<string, LabelPoint>>({});

  const keyword = searchText.trim();
  const filteredResults = keyword
    ? SEARCH_RESULTS.filter(
        (item) => item.name.includes(keyword) || item.subtitle.includes(keyword),
      )
    : SEARCH_RESULTS;

  const showSearchResults = keyword.length > 0;

  const focusRegion = (nextRegion: MapRegion) => {
    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, 250);
  };

  const focusPlace = (place: SearchPlace) => {
    setSelectedPlaceId(place.id);
    focusRegion(
      buildRegion(place.latitude, place.longitude, region.latitudeDelta, region.longitudeDelta),
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
    setSelectedPlaceId("main");
    focusRegion(INITIAL_REGION);
  };

  useEffect(() => {
    if (!mapReady || !mapRef.current || mapSize.width === 0 || mapSize.height === 0) {
      return;
    }

    let cancelled = false;

    const syncLabelPoints = async () => {
      const nextEntries = await Promise.all(
        SEARCH_RESULTS.map(async (place) => {
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
  }, [mapReady, mapSize.height, mapSize.width, region]);

  const renderMarkerLabels = () => {
    if (!NativeMapView) {
      return null;
    }

    return (
      <View pointerEvents="none" style={styles.markerLabelLayer}>
        {SEARCH_RESULTS.map((place) => {
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

          return (
            <View
              key={place.id}
              style={[
                styles.floatingLabel,
                {
                  left: point.x - MARKER_LABEL_WIDTH / 2,
                  top: point.y - 50,
                },
                selectedPlaceId === place.id && styles.floatingLabelActive,
              ]}
            >
              <Text
                style={[
                  styles.floatingLabelText,
                  selectedPlaceId === place.id && styles.floatingLabelTextActive,
                ]}
                numberOfLines={1}
              >
                {place.name}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderMap = () => {
    if (!NativeMapView || !NativeMarker) {
      return <MapBackdrop />;
    }

    return (
      <NativeMapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        onRegionChangeComplete={(nextRegion: MapRegion) => setRegion(nextRegion)}
        onMapReady={() => setMapReady(true)}
        showsBuildings
        showsCompass={false}
        showsIndoorLevelPicker
      >
        {SEARCH_RESULTS.map((place) => (
          <NativeMarker
            key={place.id}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.name}
            description={place.subtitle}
            pinColor={selectedPlaceId === place.id ? "#58AF55" : "#6C879B"}
            onPress={() => focusPlace(place)}
          />
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
        className="flex-1 bg-[#EEF1E9]"
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
                placeholder="시설 검색"
                placeholderTextColor="#9AA0AA"
                className="ml-2 flex-1 py-0 text-[17px] text-[#262931]"
              />
              <Pressable
                onPress={() => setSearchText("")}
                className="h-8 w-8 items-center justify-center rounded-full bg-[#F1EFEA]"
              >
                <Ionicons name="close" size={18} color="#7C7A75" />
              </Pressable>
            </View>
          </View>

          {showSearchResults && (
            <View className="mt-4 rounded-[30px] bg-white px-4 py-3 shadow-lg">
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
                    <View className="mr-4 h-12 w-12 items-center justify-center rounded-[16px] bg-[#D5E4D0]">
                      <Image
                        source={LOCATION_ICON}
                        className="h-6 w-6"
                        resizeMode="contain"
                      />
                    </View>

                    <View className="flex-1 pt-0.5">
                      <Text className="text-[17px] font-bold text-[#12141A]">
                        {item.name}
                      </Text>
                      <Text className="mt-1 text-[14px] font-medium text-[#A0A3AB]">
                        {item.subtitle}
                      </Text>
                    </View>
                  </Pressable>
                ))}

                {filteredResults.length === 0 && (
                  <View className="py-8">
                    <Text className="text-center text-[14px] text-[#98A2B3]">
                      검색 결과가 없습니다.
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
          style={{ bottom: tabBarHeight + 74 }}
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
});
