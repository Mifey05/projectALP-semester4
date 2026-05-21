import { router } from "expo-router";
import React, {
  useState,
  useRef
} from "react";
import ShareModal from "../components/ShareModal"; 

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  PanResponder,
  Modal,
  Alert,
  Animated
} from "react-native";

import {
  Ionicons,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import { LinearGradient } from "expo-linear-gradient";

import { styles } from "../constants/styles";

import TemplateModal
from "../components/TemplateModal";

import ElementModal
from "../components/ElementModal";

interface ElementItem {

  id: number;

  type:
    | "text"
    | "price"
    | "emoji"
    | "square"
    | "circle"
    | "star"
    | "line";

  text?: string;

  emoji?: string;

  color?: string;

  fontFamily?: string;

  selected?: boolean;

  x: number;
  y: number;

  width?: number;
  height?: number;
}

export default function HomeScreen() {

  // ======================================================
  // MODAL
  // ======================================================

  const [showTemplate,
    setShowTemplate] =
    useState(false);

  const [showElement,
    setShowElement] =
    useState(false);

  const [showText,
    setShowText] =
    useState(false);

  const [showShare,
  setShowShare] =
  useState(false);
  // ======================================================
  // CAPTION
  // ======================================================

  const [editingCaption,
    setEditingCaption] =
    useState(false);

  const [caption,
    setCaption] =
    useState(
`Nasi goreng spesial dengan diskom 50% untuk pelanggan setia 🔥! Nikmati kelezatan nasi goreng kami dengan harga terjangkau🍜. Promo berlaku setiap hari Senin dan Kamis. Jangan lewatkan kesempatan ini untuk mencicipi hidangan favorit Anda dengan harga spesial!`
    );

  // ======================================================
  // TEMPLATE
  // ======================================================

  const templates = [

  // LOCAL IMAGE
  require("../assets/images/template1.jpg"),

  // ONLINE IMAGE
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",

  "https://images.unsplash.com/photo-1550547660-d9450f859349",

  "https://images.unsplash.com/photo-1526318472351-c75fcf070305",

  "https://images.unsplash.com/photo-1498837167922-ddd27525d352",

  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",

  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
];
  const [canvasBg,
    setCanvasBg] =
    useState(templates[0]);

  const [history,
      setHistory] =
      useState<any[]>([]);

  const [redoHistory,
    setRedoHistory] =
    useState<any[]>([]);

  const [showComment,
    setShowComment] =
    useState(false);

  const [comment,
    setComment] =
    useState("");

  const [isSaved,
  setIsSaved] =
  useState(false);
  
  const [showExitModal,
  setShowExitModal] =
  useState(false);
  
  const [showSaveModal,
  setShowSaveModal] =
  useState(false);

  const [comments,
    setComments] =
    useState<string[]>([]);

  const commentAnim =
    useRef(
      new Animated.Value(0)
    ).current;
  
  const commentPanResponder =
  PanResponder.create({

    onMoveShouldSetPanResponder:
      (_, gesture) =>
        gesture.dy > 10,

    onPanResponderMove:
      (_, gesture) => {

        if (gesture.dy > 0) {

          commentAnim.setValue(
            gesture.dy
          );
        }
      },

    onPanResponderRelease:
      (_, gesture) => {

        if (gesture.dy > 120) {

          Animated.timing(
            commentAnim,
            {
              toValue: 700,
              duration: 220,
              useNativeDriver: true
            }
          ).start(() =>
            setShowComment(false)
          );

        } else {

          Animated.spring(
            commentAnim,
            {
              toValue: 0,
              useNativeDriver: true
            }
          ).start();
        }
      }
  });
  // ======================================================
  // FONT
  // ======================================================

    const [selectedShape, setSelectedShape] =
      useState("");

    const [selectedShapeColor,
      setSelectedShapeColor] =
      useState("#FFB100");

    const [selectedFont,
      setSelectedFont] =
      useState("System");

    const [selectedTextBg,
      setSelectedTextBg] =
      useState("#FFB100");

    const [useTextBackground,
      setUseTextBackground] =
      useState(true);

    const fonts = [

      {
        name: "Bold",
        family: "System"
      },

      {
        name: "Mono",
        family: "monospace"
      },

      {
        name: "Sans",
        family: "sans-serif"
      }
    ];

    const [elements,
      setElements] =
      useState<ElementItem[]>([
        {

          id: 1,

          type: "text",

          text:
            "MENU SPESIAL",

          x: 40,
          y: 50,

          width: 240,
          height: 90,

          fontFamily: "System",

          color: "#FFB100"
        }
      ]);

    const addText = () => {
      setIsSaved(false);
      setElements([
        ...elements,

        {
          id: Date.now(),

          type: "text",

          text: "TEXT BARU",

          color: useTextBackground
            ? selectedTextBg
            : "transparent",

          fontFamily: selectedFont,

          x: 80,
          y: 120,

          width: 220,
          height: 90
        }
      ]);

      setShowText(false);
    };
  const selectElement =
  (
    id: number
  ) => {

    const updated =
      elements.map(
        element => ({

        ...element,

        selected:
          element.id === id
      }));

    setHistory([
      ...history,
      elements
    ]);

    setElements(updated);
  };

  const createPanResponder =
  (
    index: number
  ) => {

    return PanResponder.create({

      onStartShouldSetPanResponder:
        () => true,

      onPanResponderMove:
        (_, gesture) => {

          const updated =
            [...elements];

          updated[index] = {

            ...updated[index],

            x:
              gesture.moveX - 180,

            y:
              gesture.moveY - 260
          };

          setElements(updated);
        }
    });
  };

  const createResizeResponder =
  (
    index: number
  ) => {

    return PanResponder.create({

      onStartShouldSetPanResponder:
        () => true,

      onPanResponderMove:
        (_, gesture) => {

          const updated =
            [...elements];

          updated[index] = {

            ...updated[index],

            width:
              Math.max(
                60,

                (updated[index].width || 100)
                + gesture.dx * 0.6
              ),

            height:
              Math.max(
                40,

                (updated[index].height || 60)
                + gesture.dy * 0.6
              )
          };

          setElements(updated);
        }
    });
  };

  const deleteElement =
  (
    id: number
  ) => {

    setElements(
      elements.filter(
        item =>
          item.id !== id
      )
    );
  };

  const addEmoji =
  (
    emoji: string
  ) => {
    setIsSaved(false);
    setElements([
      ...elements,

      {
        id: Date.now(),

        type: "emoji",

        emoji,

        x: 140,
        y: 240
      }
    ]);
  };

  const addShape =
  (
    type: string,
    color: string
  ) => {
    setIsSaved(false);
    setElements([
      ...elements,

      {
        id: Date.now(),

        type:
          type as any,

        color,

        x: 120,
        y: 220,

        width: 90,
        height: 90
      }
    ]);
  };
  const handleSave = () => {
    setIsSaved(true);
    setShowSaveModal(true);
    setTimeout(() => {
      setShowSaveModal(false);
    }, 1800);
  };

  const pickImage =
    async () => {

    const result =
      await ImagePicker.launchImageLibraryAsync({

      mediaTypes:
        ImagePicker.MediaTypeOptions.Images
    });

    if (!result.canceled) {

      setCanvasBg(
        result.assets[0].uri
      );
    }
  };

  return (

    <View style={styles.container}>

      {/* ======================================================
              HEADER
          ====================================================== */}

        <LinearGradient

          colors={[
            "#BFE3DD",
            "#DDF2EE"
          ]}


          start={{
            x: 0,
            y: 0
          }}

          end={{
            x: 0,
            y: 1
          }}

          style={styles.header}
        >
                

          {/* LEFT */}

          <View style={styles.headerLeft}>

            {/* HOME */}

            <TouchableOpacity

              style={styles.homeBtn}

              onPress={() => {

                if (!isSaved) {

                  setShowExitModal(true);

                  return;
                }

                router.push("/beranda");
              }}
            >

              <Ionicons
                name="home-outline"
                size={18}
              />

            </TouchableOpacity>

            {/* UNDO */}

            <TouchableOpacity

              style={styles.iconBtn}

              onPress={() => {

                if (history.length === 0)
                  return;

                const previous =
                  history[
                    history.length - 1
                  ];

                setRedoHistory([
                  ...redoHistory,
                  elements
                ]);

                setElements(previous);

                setHistory(
                  history.slice(
                    0,
                    history.length - 1
                  )
                );
              }}
            >

              <Ionicons
                name="arrow-undo"
                size={20}
                color="#444"
              />

            </TouchableOpacity>
            {/* REDO */}

            <TouchableOpacity

              style={styles.iconBtn}

              onPress={() => {

                if (
                  redoHistory.length === 0
                ) return;

                const next =
                  redoHistory[
                    redoHistory.length - 1
                  ];

                setHistory([
                  ...history,
                  elements
                ]);

                setElements(next);

                setRedoHistory(
                  redoHistory.slice(
                    0,
                    redoHistory.length - 1
                  )
                );
              }}
            >

              <Ionicons
                name="arrow-redo"
                size={20}
                color="#444"
              />

            </TouchableOpacity>

          </View>

          {/* RIGHT */}

          <View style={styles.headerRight}>
            {/* SAVE */}
            <TouchableOpacity

              style={styles.iconBtn}

              onPress={handleSave}
            >

              <Ionicons
                name="save-outline"
                size={20}
                color="#444"
              />

            </TouchableOpacity>

            {/* COMMENT */}

            <TouchableOpacity

              style={styles.iconBtn}

              onPress={() => {

                setShowComment(true);

                commentAnim.setValue(700);

                Animated.spring(
                  commentAnim,
                  {
                    toValue: 0,
                    useNativeDriver: true
                  }
                ).start();
              }}
            >

              <Ionicons
                name=
                "chatbubble-ellipses-outline"

                size={20}
                color="#444"
              />

            </TouchableOpacity>

            {/* SHARE */}

            <TouchableOpacity

                style={styles.iconBtn}

                onPress={() =>
                  setShowShare(true)
                }
              >

                <Ionicons
                  name=
                  "share-social-outline"

                  size={20}
                  color="#444"
                />

              </TouchableOpacity>

          </View>

        </LinearGradient>

      {/* ======================================================
          BODY
      ====================================================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.editorArea}>

          {/* ======================================================
              CANVAS
          ====================================================== */}

          <View style={styles.canvas}>

            <Image

              source={
                typeof canvasBg === "string"
                ? { uri: canvasBg }
                : canvasBg
              }

              style={styles.bgImage}
            />

            {elements.map(
              (item, index) => {

              const panResponder =
                createPanResponder(
                  index
                );

              const resizeResponder =
                createResizeResponder(
                  index
                );

              return (

                <View

                  key={item.id}

                  {...panResponder
                  .panHandlers}

                  onTouchStart={() =>
                    selectElement(
                      item.id
                    )
                  }

                  style={{
                    position: "absolute",

                    left: item.x,
                    top: item.y,
                  }}
                >

                  {/* DELETE */}

                  {item.selected && (

                  <TouchableOpacity

                    style={styles.deleteBtn}

                    onPress={() =>
                      deleteElement(
                        item.id
                      )
                    }
                  >

                    <Ionicons
                      name="close"
                      size={14}
                      color="white"
                    />

                  </TouchableOpacity>

                  )}

                  {/* TEXT */}

                  {(item.type === "text" ||
                    item.type === "price")
                    && (

                    <View

                      style={[

                        item.color === "transparent"
                          ? {}
                          : styles.textBox,

                        {
                          backgroundColor:
                            item.color,

                          width:
                            item.width,

                          height:
                            item.height
                        }
                      ]}
                    >

                      <TextInput

                        multiline

                        value={item.text}

                        onChangeText={(value) => {
                          
                          setIsSaved(false);
                          const updated =
                            [...elements];

                          updated[index].text =
                            value;

                          // AUTO HEIGHT
                          const lines =
                            value.split("\n").length;

                          updated[index].height =
                            Math.max(
                              90,
                              lines * 34
                            );

                          setElements(updated);
                        }}

                        style={[

                          item.type
                          === "price"

                          ? styles.priceText

                          : styles.titleText,

                          {
                            fontFamily:
                              item.fontFamily,

                            color:

                              item.color === "transparent"

                              ? selectedTextBg

                              : "#FFFFFF"
                          }
                        ]}
                      />

                    </View>
                  )}

                  {/* EMOJI */}

                  {item.type === "emoji"
                  && (

                    <Text style={{
                      fontSize: 60
                    }}>
                      {item.emoji}
                    </Text>

                  )}

                  {/* SHAPE */}

                  {item.type === "square"
                  && (

                    <View
                      style={{
                        width:
                          item.width || 100,

                        height:
                          item.height || 100,

                        backgroundColor:
                          item.color,

                        borderRadius: 12
                      }}
                    />
                  )}


                  {item.type === "circle"
                  && (

                    <View
                      style={{
                        width:
                          item.width || 100,

                        height:
                          item.height || 100,

                        borderRadius: 999,

                        backgroundColor:
                          item.color
                      }}
                    />

                  )}

                  {item.type === "star"
                  && (

                    <View
                      style={{
                        width:
                          item.width || 90,

                        height:
                          item.height || 90,

                        justifyContent:
                          "center",

                        alignItems:
                          "center"
                      }}
                    >

                      <Ionicons
                        name="star"
                        size={80}
                        color={item.color}
                      />

                    </View>

                  )}

                  {item.type === "line"
                  && (

                    <View
                      style={{
                        width:
                          item.width || 140,

                        height: 8,

                        borderRadius: 20,

                        backgroundColor:
                          item.color
                      }}
                    />

                  )}


                  {/* RESIZE */}

                  {item.selected && (

                  <View

                    {...resizeResponder
                    .panHandlers}

                    style={
                      styles.resizeHandle
                    }
                  >

                    <AntDesign
                      name="arrows-alt"
                      size={12}
                      color="#333"
                    />

                  </View>

                  )}

                </View>
              );
            })}

          </View>

          {/* ======================================================
              CAPTION
          ====================================================== */}

          <View style={styles.captionBox}>

            <View
              style={styles.captionHeader}
            >

              <Text
                style={styles.captionBadge}
              >
                Caption
              </Text>

              <TouchableOpacity

                onPress={() =>
                  setEditingCaption(
                    !editingCaption
                  )
                }
              >

                <Ionicons

                  name={
                    editingCaption
                    ? "save-outline"
                    : "create-outline"
                  }

                  size={20}

                  color="#333"
                />

              </TouchableOpacity>

            </View>

            {editingCaption ? (

              <TextInput

                multiline

                value={caption}

                onChangeText={
                  setCaption
                }

                style={
                  styles.captionInput
                }
              />

            ) : (

              <Text
                style={
                  styles.captionText
                }
              >
                {caption}
              </Text>

            )}

          </View>

        </View>

      </ScrollView>

      {/* ======================================================
          CHATBOT
      ====================================================== */}

      <TouchableOpacity
        style={styles.chatBot}
      >

        <MaterialIcons
          name="smart-toy"
          size={28}
          color="#444"
        />

      </TouchableOpacity>

      {/* ======================================================
          BOTTOM NAV
      ====================================================== */}

      <View style={styles.bottomNav}>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            setShowTemplate(true)
          }
        >

          <Ionicons
            name="grid-outline"
            size={24}
            color="#444"
          />

          <Text style={styles.navText}>
            Template
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            setShowElement(true)
          }
        >

          <Ionicons
            name="apps-outline"
            size={24}
            color="#444"
          />

          <Text style={styles.navText}>
            Element
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            setShowText(true)
          }
        >

          <Ionicons
            name="text-outline"
            size={24}
            color="#444"
          />

          <Text style={styles.navText}>
            Teks
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={pickImage}
        >

          <Ionicons
            name="image-outline"
            size={24}
            color="#444"
          />

          <Text style={styles.navText}>
            Galeri
          </Text>

        </TouchableOpacity>

      </View>

      {/* ======================================================
          TEMPLATE MODAL
      ====================================================== */}

      <TemplateModal

        visible={showTemplate}

        onClose={() =>
          setShowTemplate(false)
        }

        templates={templates}

        onSelect={(uri) =>
          setCanvasBg(uri)
        }
      />

      {/* ======================================================
          ELEMENT MODAL
      ====================================================== */}

      <ElementModal

        visible={showElement}

        onClose={() =>
          setShowElement(false)
        }

        onAddEmoji={addEmoji}

        onAddShape={addShape}

        selectedShape={
          selectedShape
        }

        setSelectedShape={
          setSelectedShape
        }
      />


      {/* ======================================================
          TEXT MODAL
      ====================================================== */}

      <Modal
      visible={showText}
      transparent
      animationType="slide"
    >

      <View style={styles.modalBg}>

        <View style={styles.bottomSheet}>

          <View style={styles.modalHeader}>

            <Text style={styles.sheetTitle}>
              Tambah Teks
            </Text>

            <TouchableOpacity
              onPress={() =>
                setShowText(false)
              }
            >

              <Ionicons
                name="close"
                size={26}
                color="#333"
              />

            </TouchableOpacity>

          </View>

          <Text style={styles.sectionTitle}>
            Style Teks
          </Text>

          <View style={styles.fontRow}>

            <TouchableOpacity
              style={[
                styles.typeBtn,

                useTextBackground &&
                styles.activeTypeBtn
              ]}

              onPress={() =>
                setUseTextBackground(true)
              }
            >
              <Text
                style={[
                  styles.typeBtnText,

                  useTextBackground &&
                  styles.activeTypeBtnText
                ]}
              >
                Background
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeBtn,

                !useTextBackground &&
                styles.activeTypeBtn
              ]}

              onPress={() =>
                setUseTextBackground(false)
              }
            >
              <Text
                style={[
                  styles.typeBtnText,

                  !useTextBackground &&
                  styles.activeTypeBtnText
                ]}
              >
                Text Only
              </Text>
            </TouchableOpacity>

          </View>

          <Text style={styles.sectionTitle}>
            Warna Background
          </Text>

          <View style={styles.colorGrid}>

            {[
              "#000000",

              "#FFB100",
              "#FF8A00",
              "#FF4D6D",
              "#FF1744",

              "#2979FF",
              "#00B0FF",
              "#00C853",
              "#64DD17",

              "#7C4DFF",
              "#D500F9",
              "#F50057",

              "#795548",
              "#9E9E9E",
              "#607D8B",

              "#E91E63",
              "#3F51B5",
              "#009688",
              "#4CAF50",

              "#FFC107",
            ].map((color, index) => (

              <TouchableOpacity

                key={index}

                style={[
                  styles.colorCard,
                  {
                    backgroundColor:
                      color,

                    borderWidth:
                      selectedTextBg === color
                        ? 3
                        : 0,

                    borderColor:
                      "#00C853"
                  }
                ]}

                onPress={() =>
                  setSelectedTextBg(color)
                }
              />

            ))}

          </View>

          <Text style={styles.sectionTitle}>
            Font
          </Text>

          <View style={styles.fontRow}>

            {fonts.map(
              (item, index) => (

              <TouchableOpacity

                key={index}

                style={[
                  styles.fontBtn,

                  selectedFont === item.family &&
                  styles.activeFontBtn
                ]}

                onPress={() =>
                  setSelectedFont(
                    item.family
                  )
                }
              >

                <Text style={{
                  fontFamily:
                    item.family,

                  fontSize: 16
                }}>
                  {item.name}
                </Text>

              </TouchableOpacity>

            ))}

          </View>

          <TouchableOpacity
            style={styles.addTextBtn}
            onPress={addText}
          >
            <Text style={styles.addTextBtnText}>
              Tambah Teks
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </Modal>

          {/* ======================================================
              COMMENT PANEL
          ====================================================== */}

          {showComment && (
          <Animated.View

            {...commentPanResponder.panHandlers}

            style={[

              styles.commentBottomSheet,

              {
                transform: [
                  {
                    translateY:
                      commentAnim
                  }
                ]
              }
            ]}
          >

            {/* HANDLE */}

            <View style={styles.sheetHandle} />

            {/* HEADER */}

            <View style={styles.commentHeader}>

              <Text style={styles.commentTitle}>
                Komentar
              </Text>

            </View>

            {/* COMMENT LIST */}

            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              {comments.map(
                (item, index) => (

                <View
                  key={index}
                  style={styles.commentBubble}
                >

                  <Text>
                    {item}
                  </Text>

                </View>

              ))}

            </ScrollView>

            {/* INPUT */}

            <View style={styles.commentInputRow}>

              <TextInput

                placeholder="Tambah komentar..."

                value={comment}

                onChangeText={setComment}

                style={styles.commentInput}
              />

              <TouchableOpacity

                style={styles.sendBtn}

                onPress={() => {

                  if (!comment)
                    return;

                  setComments([
                    ...comments,
                    comment
                  ]);

                  setComment("");
                }}
              >

                <Ionicons
                  name="send"
                  size={18}
                  color="white"
                />

              </TouchableOpacity>

            </View>

          </Animated.View>

          )}
          <Modal
            visible={showExitModal}
            transparent
            animationType="fade"
          >

            <View style={styles.logoutOverlay}>

              <View style={styles.logoutCard}>

                <View style={styles.logoutIconBox}>

                  <Ionicons
                    name="warning-outline"
                    size={34}
                    color="#FF9800"
                  />

                </View>

                <Text style={styles.logoutTitle}>
                  Keluar Tanpa Save?
                </Text>

                <Text style={styles.logoutDesc}>
                  Desain belum disimpan.
                  Yakin mau keluar?
                </Text>

                <View style={styles.logoutBtnRow}>

                  <TouchableOpacity

                    style={styles.cancelLogoutBtn}

                    onPress={() =>
                      setShowExitModal(false)
                    }
                  >

                    <Text style={styles.cancelLogoutText}>
                      Batal
                    </Text>

                  </TouchableOpacity>

                  <TouchableOpacity

                    style={styles.confirmLogoutBtn}

                    onPress={() => {

                      setShowExitModal(false);

                      router.push("/beranda");
                    }}
                  >

                    <Text style={styles.confirmLogoutText}>
                      Keluar
                    </Text>

                  </TouchableOpacity>

                </View>

              </View>

            </View>

          </Modal>
          <Modal
            visible={showSaveModal}
            transparent
            animationType="fade"
          >

            <View style={styles.saveOverlay}>

              <View style={styles.saveCard}>

                <View style={styles.saveIconBox}>

                  <Ionicons
                    name="checkmark-circle"
                    size={70}
                    color="#00C853"
                  />

                </View>

                <Text style={styles.saveTitle}>
                  Berhasil Disimpan
                </Text>

                <Text style={styles.saveDesc}>
                  Desain berhasil disimpan
                </Text>

              </View>

            </View>

          </Modal>
          <ShareModal

            visible={showShare}

            onClose={() =>
              setShowShare(false)
            }

            preview={canvasBg}

            caption={caption}

            elements={elements}
          />
        </View>
      );
    }
