import React, { useRef } from "react";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  PanResponder
} from "react-native";

import {
  Ionicons
} from "@expo/vector-icons";

import { styles } from "../constants/styles";

interface Props {

  visible: boolean;

  onClose: () => void;

  templates: string[];

  onSelect: (
    uri: string
  ) => void;
}

export default function TemplateModal({

  visible,
  onClose,
  templates,
  onSelect

}: Props) {
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

          {/* ======================================================
              HANDLE
          ====================================================== */}

          <View style={styles.sheetHandle} />

          {/* ======================================================
              HEADER
          ====================================================== */}

          <View style={styles.modalHeader}>

            <Text style={styles.sheetTitle}>
              Template
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

          {/* ======================================================
              TEMPLATE LIST
          ====================================================== */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 20
            }}
          >

            {templates.map(
              (item, index) => (

              <TouchableOpacity

                key={index}

                style={{
                  marginRight: 14
                }}

                activeOpacity={0.85}

                onPress={() => {

                  onSelect(item);

                  onClose();
                }}
              >

                <Image

                  source={
                    typeof item === "string"
                    ? { uri: item }
                    : item
                  }

                  style={styles.templatePreview}
                />

              </TouchableOpacity>

            ))}

          </ScrollView>

        </Animated.View>

      </View>

    </Modal>
  );
}