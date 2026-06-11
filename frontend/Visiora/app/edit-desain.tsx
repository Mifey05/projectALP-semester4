import { router, useLocalSearchParams } from "expo-router";
import React, {
  useState,
  useRef,
  useEffect
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShareModal from "../components/ShareModal"; 
import ViewShot from "react-native-view-shot";
import { ActivityIndicator } from "react-native";
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
  uploadDesignBackground,
  uploadDesignElement,
} from "../services/designUpload.services";

import {
  Ionicons,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import { LinearGradient } from "expo-linear-gradient";

import { styles } from "../constants/styles";
import { createDesign, updateDesign, getDesignById, generateCaptionFromImage} from "../services/editdesain.services";
import { fetchTemplates } from "../services/TemplateService";
import { TemplateModel } from "../models/ListTemplate";

import TemplateModal from "../components/TemplateModal";

import ElementModal from "../components/ElementModal";

interface ElementItem {

  id: number;

  type:
    | "text"
    | "price"
    | "emoji"
    | "square"
    | "circle"
    | "star"
    | "line"
    | "image";
  imageUrl?: string;

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
  const viewShotRef = useRef<any>(null);
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

  const captionVariantsByCategory: Record<string, string[]> = {
    FnB: [
      `Beli 1 gratis 1 untuk semua menu ayam geprek hari ini saja! Ajak teman dan keluarga untuk menikmati sensasi pedas gurih dari promo spesial kami 🍗✨.`,
      `Paket hemat sahur: nasi uduk + ayam goreng + es teh hanya Rp25.000. Buruan pesan sekarang sebelum habis! 🌙🥤`,
      `Diskon 30% untuk semua minuman segar! Segarkan hari Anda dengan jus buah asli dan smoothies enak dari menu favorit kami 🍹💚.`,
      `Happy hour makan siang: semua menu utama hanya Rp35.000! Cepat sebelum jam 14:00, nikmati rasa nikmat di setiap suapan 🍛⏰.`,
      `Promo spesial akhir pekan: gratis kentang goreng untuk setiap pembelian burger combo. Ayo kumpul bersama dan makan seru! 🍔🍟`,
      `Dapatkan dessert manis gratis setiap pembelian minuman premium. Cocok untuk kembalikan energi dan mood kamu hari ini 🍮🥤.`,
      `Menu keluarga hemat: 4 porsi menu favorit + 2 minuman hanya Rp120.000. Pas banget untuk kumpul bareng keluarga ❤️👨‍👩‍👧‍👦.`,
      `Coba paket nasi box spesial kami dengan harga promo mulai Rp28.000. Ideal untuk acara kantor dan arisan keluarga 🥡🎉.`,
      `Jangan lewatkan promo langganan: ulang tahun member dapat diskon ekstra 20% setiap transaksi. Daftar sekarang dan nikmati banyak keuntungan! 🎁✨`,
      `Nikmati promo eksklusif hari ini: semua menu favorit dapat potongan harga hingga 25%. Ajak temanmu dan makan bersama! 🥘🎉`
    ],
    Fashion: [
      `Diskon khusus fashion: beli 2 gratis 1 untuk koleksi terbaru musim ini! Tampil trendi tanpa menguras dompet 💃🛍️.`,
      `Penawaran akhir pekan: potongan 30% untuk semua pakaian kasual. Segera lengkapi gaya kamu di toko kami! 👗✨`,
      `Dapatkan hadiah menarik setiap pembelian minimal Rp200.000. Fashion statement-mu jadi makin keren! 🎁👠`,
      `Fresh look untuk musim baru: diskon besar-besaran untuk dress, jeans, dan outerwear terbaru. Ayo belanja sekarang! 👚🧥`,
      `Promosi eksklusif member: potongan ekstra 15% untuk pelanggan setia. Daftar sekarang dan nikmati benefitnya! 💎👖`,
      `Belanja hemat tanpa kompromi gaya: semua aksesori fashion diskon 25% hanya hari ini. ✨👒`,
      `Style upgrade: outfit match sempurna untuk acara spesial dengan harga promo menarik. 🎉👗`,
      `Koleksi streetwear terbaru sudah hadir, dapatkan harga spesial untuk pembelian pertama kamu. 🛹👟`,
      `Promo bundle fashion: atasan + bawahan + aksesori dalam satu paket hemat. 💼👚`,
      `Era fashion baru dimulai sekarang dengan diskon menarik untuk limited edition items. 💫👠`
    ],
    Beauty: [
      `Perawatan wajah premium kini lebih hemat! Dapatkan potongan harga hingga 25% untuk semua treatment kecantikan. 💆‍♀️✨`,
      `Promo makeup spesial: beli palette terbaik dan dapatkan free brush set. Cantik tanpa ribet! 💄💋`,
      `Diskon perawatan rambut: shampoo dan conditioner lengkap dengan harga promo. Rambut sehatmu jadi prioritas. 💇‍♀️🌿`,
      `Beauty bundle eksklusif untuk kamu yang ingin tampil glowing setiap hari. Dapatkan harga spesial sekarang juga! 🌟🧴`,
      `Solusi kulit sehat dengan potongan harga di semua produk skincare favorit. Segera kunjungi toko kami! 🍃💧`,
      `Spa day hemat: paket perawatan lengkap dengan harga promo terbatas. Ajak sahabatmu dan manjakan diri! 🛁🌸`,
      `Beli 2 produk kecantikan, gratis 1 produk pilihan. Percantik rutinitasmu tanpa bikin kantong bolong. 🛍️✨`,
      `Treat yourself: diskon spesial untuk semua koleksi parfum dan body mist hari ini. 🌺🌸`,
      `Rangkaian makeup baru tersedia dengan promo paket hemat. Segera tampil sempurna untuk momen spesialmu! 💫👁️`,
      `Khusus member setia: diskon tambahan 10% untuk setiap transaksi di bulan ini. 💎💓`
    ],
  };

  const getCaptionVariants = (template?: TemplateModel | null) => {
    const baseCaption = template?.caption?.trim();
    const title = template?.title?.trim() || "promo spesial";
    const category = template?.category || "FnB";

    const categorySeedPhrases: Record<string, string[]> = {
      FnB: [
        "Nikmati sajian lezat dari",
        "Promo hemat untuk menu",
        "Penawaran spesial untuk pembelian",
        "Segera pesan menu favorit",
        "Bergabunglah dengan promo terbaru",
        "Diskon terbatas untuk pelanggan setia",
        "Makan enak jadi hemat dengan",
        "Pilihan terbaik untuk gaya hidup kuliner",
        "Cicipi sensasi rasa baru dari",
        "Jangan lewatkan promo menarik"
      ],
      Fashion: [
        "Tampil modis dengan koleksi",
        "Style upgrade bersama",
        "Diskon fashion terbaru dari",
        "Paket gaya eksklusif untuk",
        "Fashion statement paling keren dari",
        "Promo trendi untuk pilihan",
        "Belanja gaya jadi lebih hemat dengan",
        "Wardrobe baru siap melengkapi",
        "Dapatkan tampilan premium dari",
        "Aksesori dan outfit terbaik dari"
      ],
      Beauty: [
        "Cantik maksimal dengan",
        "Perawatan kecantikan spesial dari",
        "Rahasia glowing bersama",
        "Skincare dan makeup terbaik dari",
        "Promo perawatan eksklusif untuk",
        "Beauty routine baru hadir di",
        "Treat yourself dengan",
        "Wajah cerah jadi lebih mudah bersama",
        "Produk kecantikan andalan dari",
        "Serangkaian perawatan premium untuk"
      ],
    };

    const seedPhrases =
      categorySeedPhrases[category] ||
      categorySeedPhrases.FnB;

    const variants = new Set<string>();
    if (baseCaption) {
      variants.add(baseCaption);
    }

    seedPhrases.forEach((phrase) => {
      variants.add(`${phrase} ${title}.`);
    });

    if (variants.size < 10) {
      captionVariantsByCategory.FnB.forEach((item) => {
        if (variants.size >= 10) return;
        variants.add(item);
      });
    }

    return Array.from(variants).slice(0, 10);
  };

  const [captionVariants,
    setCaptionVariants] =
    useState<string[]>(
      getCaptionVariants(null)
    );

  const shuffleCaption = () => {
    setIsSaved(false);
    const availableCaptions = captionVariants.filter(
      item => item !== caption
    );
    const nextCaption =
      availableCaptions.length > 0
        ? availableCaptions[
            Math.floor(
              Math.random() * availableCaptions.length
            )
          ]
        : captionVariants[0];

    setCaption(nextCaption);
    setEditingCaption(false);
  };

  // ======================================================
  // TEMPLATE
  // ======================================================

  const [templates,
    setTemplates] =
    useState<TemplateModel[]>([]);

  const [selectedTemplate,
    setSelectedTemplate] =
    useState<TemplateModel | null>(null);

  const [canvasBg,
    setCanvasBg] =
    useState<any>(require("../assets/images/template1.jpg"));

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

  const [
  isGeneratingCaption,
  setIsGeneratingCaption
] = useState(false);
  
  const [showExitModal,
  setShowExitModal] =
  useState(false);
  
  const [showSaveModal,
  setShowSaveModal] =
  useState(false);

  const params = useLocalSearchParams();

  const getParamValue = (
    value: string | string[] | undefined
  ) =>
    Array.isArray(value)
      ? value[0]
      : value;

  const designId = Number(
    getParamValue(params.designId)
  );

  const templateThumbnailParam =
    getParamValue(params.templateThumbnail);

  const templateCaptionParam =
    getParamValue(params.templateCaption);

  const templateCategoryParam =
    getParamValue(params.templateCategory);

  const templateTitleParam =
    getParamValue(params.templateTitle);

  useEffect(() => {
    if (designId) {
      fetchDesign();
    }
  }, [designId]);

  const loadTemplates = async () => {
    try {
      const data = await fetchTemplates();
      setTemplates(data);

      if (data.length && !selectedTemplate) {
        setSelectedTemplate(data[0]);
        setCanvasBg(data[0].thumbnail);
      }
    } catch (err) {
      console.error("loadTemplates error:", err);
    }
  };

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
  const handleUploadBackground = async (
  imageUri: string
) => {

  try {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    if (!token) return;

    const result =
      await uploadDesignBackground(
        token,
        imageUri
      );

    setCanvasBg(result.url);

  } catch (error) {

    console.log(error);

    Alert.alert(
      "Error",
      "Gagal upload background"
    );
  }
};


const handleUploadElement = async (
  imageUri: string
) => {
  try {
    const token =
      await AsyncStorage.getItem("token");

    if (!token) return;

    const result =
      await uploadDesignElement(
        token,
        imageUri
      );
    
    console.log("ELEMENT RESULT");
    console.log(result);
    setElements(prev => [
      ...prev,
      {
        id: Date.now(),

        type: "image",

        imageUrl:
          result.url,

        x: 100,
        y: 100,

        width: 150,
        height: 150,
      }
    ]);

  } catch (error) {
    console.log(error);

    Alert.alert(
      "Error",
      "Gagal upload element"
    );
  }
};

  const pickImage = async () => {

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

    if (result.canceled)
      return;

    const imageUri =
      result.assets[0].uri;

    Alert.alert(
      "Upload Gambar",
      "Gunakan gambar sebagai?",
      [
        {
          text: "Background",
          onPress: () =>
            handleUploadBackground(
              imageUri
            ),
        },
        {
          text: "Produk / Element",
          onPress: () =>
            handleUploadElement(
              imageUri
            ),
        },
        {
          text: "Batal",
          style: "cancel",
        },
      ]
    );
  };

  const fetchDesign =
  async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      if (!token || !designId) {
        console.log(
          "fetchDesign skipped:",
          { designId, token }
        );
        return;
      }

      console.log(
        "fetchDesign start:",
        { designId }
      );

      const result =
        await getDesignById(
          token,
          designId
        );

      console.log(
        "fetchDesign result:",
        result
      );

      const design =
        result.data;

      setCaption(
        design.caption
      );

      const parsed =
        typeof design.design_json
        === "string"

        ? JSON.parse(
            design.design_json
          )

        : design.design_json;

      const templateFromDesign: TemplateModel = {
        id: design.template_id || 0,
        title: design.title || "",
        thumbnail: design.thumbnail_url || "",
        caption: design.caption || "",
        category: design.category || "FnB",
      };

      setSelectedTemplate(templateFromDesign);
      setCaptionVariants(
        getCaptionVariants(templateFromDesign)
      );

      setCanvasBg(
        parsed.canvasBg ||
          design.thumbnail_url ||
          canvasBg
      );

      setElements(
        parsed.elements || []
      );

    } catch (err) {

      console.log(err);
    }
  };
const handleGenerateCaption = async () => {

  Alert.alert(
    "AI Caption",
    "Apakah ingin membuat caption dari gambar ini?",
    [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Ya",
        onPress: async () => {

          try {

            const token =
              await AsyncStorage.getItem(
                "token"
              );

            if (!token) return;

            setIsGeneratingCaption(true);

            const imageUri =
              await viewShotRef.current?.capture();

            if (!imageUri) {
              setIsGeneratingCaption(false);
              return;
            }

            const result =
              await generateCaptionFromImage(
                token,
                imageUri
              );

            if (
              result?.data?.caption
            ) {

              setCaption(
                result.data.caption
              );

            }

          } catch (err) {

            console.log(err);

            Alert.alert(
              "Error",
              "Gagal generate caption"
            );
          } finally {
            setIsGeneratingCaption(false);
          }

        },
      },
    ]
  );

};
 const handleSave =
async () => {

  try {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    console.log(
      "TOKEN:",
      token
    );

    if (!token) {

      console.log(
        "Token tidak ditemukan"
      );

      return;
    }
    
      const payload = {

        template_id: selectedTemplate?.id ?? 1,

        title: "Design Saya",

        category: selectedTemplate?.category ?? "FnB",

        thumbnail_url:
          typeof canvasBg === "string"
          ? canvasBg
          : selectedTemplate?.thumbnail ?? "",

        design_json: {
          elements,
          canvasBg
        },

        caption
      };

      const result =
        designId
          ? await updateDesign(
              token,
              designId,
              payload
            )
          : await createDesign(
              token,
              payload
            );

      console.log(result);

      setIsSaved(true);

      setShowSaveModal(true);

      setTimeout(() => {

        setShowSaveModal(false);

      }, 1800);

    } catch (err) {

      console.log(err);
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
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 250,
        }}
      >
        <View style={styles.editorArea}>

          {/* ======================================================
              CANVAS
          ====================================================== */}

            <ViewShot
              ref={viewShotRef}
              options={{
                format: "png",
                quality: 1
              }}
            >

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
                  {item.type === "image" && (
                    <Image
                      source={{
                        uri: item.imageUrl,
                      }}
                      style={{
                        width:
                          item.width || 150,

                        height:
                          item.height || 150,

                        resizeMode:
                          "contain",
                      }}
                    />
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
          </ViewShot>

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

              <View style={{ flexDirection: "row", alignItems: "center" }}>

                {/* AI */}
                <TouchableOpacity

                  disabled={isGeneratingCaption}

                  style={[
                    styles.iconBtn,

                    isGeneratingCaption && {
                      opacity: 0.5
                    }
                  ]}

                  onPress={handleGenerateCaption}
                >
            
                  <Ionicons
                    name="sparkles-outline"
                    size={18}
                    color="#333"
                  />
                </TouchableOpacity>

                {/* SHUFFLE */}
                <TouchableOpacity
                  style={[
                    styles.iconBtn,
                    { marginLeft: 8 }
                  ]}
                  onPress={shuffleCaption}
                >
                  <Ionicons
                    name="shuffle"
                    size={18}
                    color="#333"
                  />
                </TouchableOpacity>

                {/* EDIT */}
                <TouchableOpacity
                  style={[
                    styles.iconBtn,
                    { marginLeft: 8 }
                  ]}
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

        onSelect={(template) => {
          setCanvasBg(template.thumbnail);
          setSelectedTemplate(template);
          setCaption(template.caption);
          setCaptionVariants(
            getCaptionVariants(template)
          );
        }}
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
          {
            isGeneratingCaption && (

              <View
                style={{
                  position: "absolute",

                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,

                  backgroundColor:
                    "rgba(0,0,0,0.45)",

                  justifyContent:
                    "center",

                  alignItems:
                    "center",

                  zIndex: 9999
                }}
              >

                <ActivityIndicator
                  size="large"
                  color="#fff"
                />

                <Text
                  style={{
                    color: "#fff",
                    marginTop: 12,
                    fontSize: 16,
                    fontWeight: "600"
                  }}
                >
                  Membuat Caption AI...
                </Text>

              </View>

            )
          }
        </View>
        
      );
    }
