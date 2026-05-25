import React, {
  useRef,
  useEffect
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  ScrollView,
  Alert
} from "react-native";

import {
  Feather,
  Ionicons
} from "@expo/vector-icons";

import ViewShot from "react-native-view-shot";

import * as MediaLibrary
from "expo-media-library";

import { styles }
from "../constants/styles";

// ======================================================

interface Props {
  visible: boolean;
  onClose: () => void;
  preview: any;
  caption: string;
  elements: any[];
}

export default function ShareModal({
  visible,
  onClose,
  preview,
  caption,
  elements
}: Props) {

  const viewShotRef =
    useRef<any>(null);


  const translateY =
    useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {

    if (visible) {

      translateY.setValue(0);

    }

  }, [visible]);

  const closeModal = () => {

    Animated.timing(
      translateY,
      {
        toValue: 900,
        duration: 180,
        useNativeDriver: true
      }
    ).start(() => {
      onClose();
    });
  };


  const panResponder =
    PanResponder.create({

      onMoveShouldSetPanResponder:
        (_, gesture) => {

          return (
            Math.abs(gesture.dy) > 12
          );
        },

      onPanResponderMove:
        (_, gesture) => {

          if (gesture.dy > 0) {

            translateY.setValue(
              gesture.dy * 0.9
            );
          }
        },

      onPanResponderRelease:
        (_, gesture) => {

          if (gesture.dy > 140) {

            closeModal();

          } else {

            Animated.spring(
              translateY,
              {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 4
              }
            ).start();
          }
        }
    });

  const downloadImage =
    async () => {

      try {

        const permission =
          await MediaLibrary.requestPermissionsAsync();

        if (!permission.granted) {

          Alert.alert(
            "Izin ditolak"
          );

          return;
        }

        const uri =
          await viewShotRef.current.capture();

        await MediaLibrary.saveToLibraryAsync(
          uri
        );

        Alert.alert(
          "Berhasil",
          "Desain berhasil diunduh"
        );

      } catch (e) {

        console.log(e);
      }
    };

  // ======================================================

  if (!visible)
    return null;

  // ======================================================

  return (

    <View style={styles.shareOverlay}>

      <Animated.View

        {...panResponder.panHandlers}

        style={[

          styles.shareModal,

          {
            transform: [
              {
                translateY
              }
            ]
          }
        ]}
      >


        <TouchableOpacity
          activeOpacity={0.8}
          onPress={closeModal}
          style={{
            alignItems: "center",
            paddingVertical: 12
          }}
        >

          <View style={styles.sheetHandle} />

        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 80
          }}
        >

          <View style={styles.shareTopMenu}>

            {/* BAGIKAN */}

            <TouchableOpacity
              style={styles.shareMenuItem}
            >

              <View style={styles.circleMenu}>

                <Feather
                  name="share"
                  size={24}
                  color="#444"
                />

              </View>

              <Text style={styles.menuText}>
                Bagikan
              </Text>

            </TouchableOpacity>

            {/* PRINT */}

            <TouchableOpacity
              style={styles.shareMenuItem}
            >

              <View style={styles.circleMenu}>

                <Ionicons
                  name="print-outline"
                  size={24}
                  color="#444"
                />

              </View>

              <Text style={styles.menuText}>
                Print
              </Text>

            </TouchableOpacity>

            {/* UNDUH */}

            <TouchableOpacity
              style={styles.shareMenuItem}
              onPress={downloadImage}
            >

              <View style={styles.circleMenu}>

                <Feather
                  name="download"
                  size={24}
                  color="#444"
                />

              </View>

              <Text style={styles.menuText}>
                Unduh
              </Text>

            </TouchableOpacity>

            {/* LAINNYA */}

            <TouchableOpacity
              style={styles.shareMenuItem}
            >

              <View style={styles.circleMenu}>

                <Feather
                  name="more-horizontal"
                  size={24}
                  color="#444"
                />

              </View>

              <Text style={styles.menuText}>
                Lainnya
              </Text>

            </TouchableOpacity>

          </View>

          <ViewShot
            ref={viewShotRef}
            options={{
              format: "jpg",
              quality: 1
            }}
          >

            <View style={styles.previewCard}>

              {/* BACKGROUND */}

              {preview && (

                <Image
                  source={
                    typeof preview === "string"
                      ? { uri: preview }
                      : preview
                  }
                  style={{
                    width: 240,
                    height: 340,
                    borderRadius: 18
                  }}
                />

              )}

              {elements.map((item, index) => (

                <View
                  key={index}
                  style={{

                    position: "absolute",

                    left: item.x,
                    top: item.y,

                    width:
                      item.width || 100,

                    height:
                      item.height || 50,

                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >

                  {/* TEXT */}

                  {item.type === "text" && (

                    <Text
                      style={{

                        fontSize: 24,

                        color:
                          item.textColor || "#FFF",

                        fontWeight: "700",

                        textAlign: "center",

                        fontFamily:
                          item.fontFamily || "System"
                      }}
                    >

                      {item.text}

                    </Text>

                  )}

                  {/* EMOJI */}

                  {item.type === "emoji" && (

                    <Text
                      style={{
                        fontSize: 42
                      }}
                    >
                      {item.emoji}
                    </Text>

                  )}

                  {/* SQUARE */}

                  {item.type === "square" && (

                    <View
                      style={{

                        width:
                          item.width || 80,

                        height:
                          item.height || 80,

                        backgroundColor:
                          item.color || "#FFB100",

                        borderRadius: 12
                      }}
                    />

                  )}

                  {/* CIRCLE */}

                  {item.type === "circle" && (

                    <View
                      style={{

                        width:
                          item.width || 80,

                        height:
                          item.height || 80,

                        borderRadius: 999,

                        backgroundColor:
                          item.color || "#2979FF"
                      }}
                    />

                  )}

                </View>

              ))}

            </View>

          </ViewShot>


          <View style={styles.captionPreview}>

            <Text style={styles.captionText}>
              {caption}
            </Text>

          </View>

        </ScrollView>

      </Animated.View>

    </View>
  );
}