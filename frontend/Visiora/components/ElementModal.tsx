import React, { useRef, useState } from "react";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { styles } from "../constants/styles";

interface Props {

  visible: boolean;

  onClose: () => void;

  onAddEmoji: (
    emoji: string
  ) => void;

  onAddShape: (
    type: string,
    color: string
  ) => void;

  selectedShape: string;

  setSelectedShape: (
    shape: string
  ) => void;
}

export default function ElementModal({

  visible,
  onClose,
  onAddEmoji,
  onAddShape,
  selectedShape,
  setSelectedShape

}: Props) {
  const [activeShape,
  setActiveShape] =
  useState("");

  const [selectedColor,
    setSelectedColor] =
    useState("#FFB100");

  const translateY =
    useRef(
      new Animated.Value(0)
    ).current;

  const panResponder =
    PanResponder.create({

      onMoveShouldSetPanResponder:
        (_, gesture) =>
          Math.abs(gesture.dy) > 10,

      onPanResponderMove:
        (_, gesture) => {

          if (gesture.dy > 0) {

            translateY.setValue(
              gesture.dy
            );
          }
        },

      onPanResponderRelease:
        (_, gesture) => {

          if (gesture.dy > 120) {

            onClose();

          } else {

            Animated.spring(
              translateY,
              {
                toValue: 0,
                useNativeDriver: true
              }
            ).start();
          }
        }
    });

  return (

    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >

      <View style={styles.modalBg}>

        <Animated.View

          {...panResponder.panHandlers}

          style={[
            styles.bottomSheet,
            {
              transform: [
                {
                  translateY
                }
              ]
            }
          ]}
        >

          <View style={styles.sheetHandle} />

          <View style={styles.modalHeader}>

            <Text style={styles.sheetTitle}>
              Element
            </Text>

            <TouchableOpacity
              onPress={onClose}
            >

              <Ionicons
                name="close"
                size={26}
                color="#333"
              />

            </TouchableOpacity>

          </View>

          <ScrollView>

            {/* EMOJI */}

            <Text style={styles.sectionTitle}>
              Emote
            </Text>

            <View style={styles.emojiGrid}>

              {[
                "🔥",
                "✨",
                "😍",
                "⭐",
                "💖",
                "🎉"
              ].map((emoji, index) => (

                <TouchableOpacity

                  key={index}

                  style={styles.emojiCard}

                  onPress={() => {

                    onAddEmoji(emoji);

                    onClose();
                  }}
                >

                  <Text style={{
                    fontSize: 36
                  }}>
                    {emoji}
                  </Text>

                </TouchableOpacity>

              ))}

            </View>

            {/* SHAPE */}

            <Text style={styles.sectionTitle}>
              Pilih Shape
            </Text>

            <View style={styles.shapeRow}>

              {[
                "square",
                "circle",
                "star",
                "line"
              ].map((shape, index) => (

                <TouchableOpacity

                  key={index}

                  style={[

                    styles.shapeCard,

                    selectedShape === shape && {

                      borderWidth: 2,

                      borderColor:
                        "#00C853",

                      backgroundColor:
                        "#E8FFF1"
                    }
                  ]}

                  onPress={() => {

                    setSelectedShape(shape);

                    setActiveShape(shape);
                  }}
                >

                  {shape === "square"
                  && (
                    <View
                      style={
                        styles.squareShape
                      }
                    />
                  )}

                  {shape === "circle"
                  && (
                    <View
                      style={
                        styles.circleShape
                      }
                    />
                  )}

                  {shape === "star"
                  && (
                    <Text style={{
                      fontSize: 40
                    }}>
                      ⭐
                    </Text>
                  )}

                  {shape === "line"
                  && (
                    <View
                      style={
                        styles.lineShape
                      }
                    />
                  )}

                </TouchableOpacity>

              ))}

            </View>

            {/* COLOR */}

            <Text style={styles.sectionTitle}>
              Pilih Warna
            </Text>

            <View style={styles.colorGrid}>

              {[
                "#FFB100",
                "#2979FF",
                "#00C853",
                "#FF4D6D",
                "#9747FF",
                "#121212"
              ].map((color, index) => (

                <TouchableOpacity

                  key={index}

                  style={[
                    styles.colorCard,
                    {
                      backgroundColor:
                        color,

                      borderWidth:
                        selectedColor === color
                          ? 3
                          : 0,

                      borderColor:
                        "#00C853"
                    }
                  ]}

                  onPress={() => {

                    if (!selectedShape)
                      return;

                    setSelectedColor(color);

                    onAddShape(
                      activeShape,
                      color
                    );

                    onClose();
                  }}
                />

              ))}

            </View>

          </ScrollView>

        </Animated.View>

      </View>

    </Modal>
  );
}