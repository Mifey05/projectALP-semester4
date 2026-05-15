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
  Alert,
  ScrollView
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

  // ======================================================
  // SWIPE CLOSE
  // ======================================================

  const translateY =
    useRef(
      new Animated.Value(0)
    ).current;
    
    useEffect(() => {

    if (visible) {

        translateY.setValue(0);

    }

    }, [visible]);
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

            Animated.timing(
              translateY,
              {
                toValue: 900,
                duration: 180,
                useNativeDriver: true
              }
            ).start(() =>
              onClose()
            );

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

  // ======================================================
  // DOWNLOAD JPG
  // ======================================================

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

  if (!visible)
    return null;

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

        {/* HANDLE */}

        <View style={styles.sheetHandle} />

        {/* ======================================================
            CONTENT
        ====================================================== */}

        <ScrollView

          showsVerticalScrollIndicator={false}

          contentContainerStyle={{
            paddingBottom: 70
          }}
        >

          {/* ======================================================
              TOP MENU
          ====================================================== */}

          <View style={styles.shareTopMenu}>

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

          {/* ======================================================
              PREVIEW DESIGN
          ====================================================== */}

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

              {/* ======================================================
                  ELEMENTS
              ====================================================== */}

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

          {/* ======================================================
              CAPTION
          ====================================================== */}

          <View style={styles.captionPreview}>

            <Text style={styles.captionText}>
              {caption}
            </Text>

          </View>

          {/* ======================================================
              BUTTON
          ====================================================== */}

          <TouchableOpacity
            style={styles.printBtn}
          >

            <Text style={styles.printText}>
              Cetak Via (Visiora)
            </Text>

          </TouchableOpacity>

          <TouchableOpacity

            style={styles.downloadBtn}

            onPress={downloadImage}
          >

            <Text style={styles.downloadText}>
              Unduh JPG
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </Animated.View>

    </View>
  );
}