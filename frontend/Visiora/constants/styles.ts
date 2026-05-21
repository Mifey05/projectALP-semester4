import {
  StyleSheet,
  Dimensions
} from "react-native";

const { width, height } =
  Dimensions.get("window");

export const styles =
  StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#FFFFFF"
  },
  header: {

    marginTop: 0,

    paddingTop: 52,

    paddingBottom: 14,

    paddingHorizontal: 14,

    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    borderBottomWidth: 1,

    borderBottomColor: "#8CC8C0",

    overflow: "hidden"
  },

  headerLeft: {

    flexDirection: "row",

    alignItems: "center",

    gap: 10
  },

  headerRight: {

    flexDirection: "row",

    alignItems: "center",

    gap: 10
  },

  iconBtn: {

    width: 40,
    height: 40,

    borderRadius: 14,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,

    borderColor: "#E8E8E8",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1
    },

    shadowOpacity: 0.03,

    shadowRadius: 2,

    elevation: 1
  },


  editorArea: {

    alignItems: "center",

    paddingTop: 20,

    paddingBottom: 160
  },


  canvas: {

    width: width - 40,

    height: height * 0.62,

    borderRadius: 26,

    overflow: "hidden",

    backgroundColor: "#EEEEEE",

    borderWidth: 0,
    borderColor: "#ffffff",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 6
    },

    shadowOpacity: 0.12,

    shadowRadius: 10,

    elevation: 8
  },

  bgImage: {

    width: "100%",
    height: "100%",

    position: "absolute"
  },

  textBox: {

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 3
    },

    shadowOpacity: 0.12,

    shadowRadius: 6,

    elevation: 6
  },

  titleText: {

    fontSize: 28,

    color: "white",

    fontWeight: "900",

    textAlign: "center",

    minWidth: 120
  },

  priceText: {

    fontSize: 40,

    color: "white",

    fontWeight: "900",

    textAlign: "center",

    minWidth: 100
  },


  deleteBtn: {

    position: "absolute",

    top: -12,
    right: -12,

    width: 28,
    height: 28,

    borderRadius: 20,

    backgroundColor: "#FF4D6D",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 999,

    elevation: 10
  },

  resizeHandle: {

    position: "absolute",

    right: -12,
    bottom: -12,

    width: 28,
    height: 28,

    borderRadius: 20,

    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",

    elevation: 10,

    borderWidth: 1,
    borderColor: "#DDD"
  },

  captionBox: {

    width: width - 40,

    backgroundColor: "white",

    borderRadius: 20,

    padding: 16,

    marginTop: 18,

    borderWidth: 1,
    borderColor: "#E5E5E5",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.06,

    shadowRadius: 6,

    elevation: 4
  },

  captionHeader: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 14
  },

  captionBadge: {

    backgroundColor: "#D7ECE7",

    paddingHorizontal: 14,
    paddingVertical: 6,

    borderRadius: 20,

    fontWeight: "700",

    color: "#333"
  },

  captionInput: {

    minHeight: 100,

    fontSize: 14,

    color: "#333",

    textAlignVertical: "top"
  },

  captionText: {

    fontSize: 14,

    lineHeight: 24,

    color: "#444"
  },

  chatBot: {

    position: "absolute",

    right: 18,
    bottom: 95,

    width: 72,
    height: 72,

    borderRadius: 40,

    backgroundColor: "#D7ECE7",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 5,
    borderColor: "#EEF9F6",

    elevation: 20
  },


  bottomNav: {

    position: "absolute",

    bottom: 0,

    width: "100%",

    backgroundColor: "white",

    flexDirection: "row",

    justifyContent: "space-around",

    paddingTop: 14,
    paddingBottom: 24,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: -4
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 20
  },

  navItem: {

    alignItems: "center"
  },

  navText: {

    marginTop: 5,

    fontSize: 11,

    color: "#333",

    fontWeight: "500"
  },

  modalBg: {

    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.35)",

    justifyContent: "flex-end"
  },

  bottomSheet: {

    backgroundColor: "white",

    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,

    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,

    minHeight: 340,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: -6
    },

    shadowOpacity: 0.12,

    shadowRadius: 10,

    elevation: 20
  },

  sheetHandle: {

    width: 60,
    height: 6,

    borderRadius: 20,

    backgroundColor: "#DDD",

    alignSelf: "center",

    marginBottom: 18
  },

  modalHeader: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 18
  },

  sheetTitle: {

    fontSize: 24,

    fontWeight: "700",

    color: "#222"
  },


  templatePreview: {

    width: 150,
    height: 220,

    borderRadius: 22,

    marginRight: 14
  },


  sectionTitle: {

    fontSize: 18,

    fontWeight: "700",

    marginBottom: 14,

    color: "#333"
  },


  emojiGrid: {

    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between"
  },

  emojiCard: {

    width: "30%",

    height: 90,

    backgroundColor: "#F3F4F6",

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 14
  },


  shapeRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 20
  },

  shapeCard: {

    width: 78,
    height: 78,

    backgroundColor: "#F3F4F6",

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center"
  },

  squareShape: {

    width: 46,
    height: 46,

    backgroundColor: "#FFB100",

    borderRadius: 8
  },

  circleShape: {

    width: 46,
    height: 46,

    borderRadius: 30,

    backgroundColor: "#2979FF"
  },

  lineShape: {

    width: 50,
    height: 6,

    borderRadius: 20,

    backgroundColor: "#FF4D6D"
  },

  colorGrid: {

    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between"
  },

  colorCard: {

    width: 54,
    height: 54,

    borderRadius: 18,

    marginBottom: 14
  },

  fontRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 10
  },

  fontBtn: {

    backgroundColor: "#F3F4F6",

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderRadius: 14
  },

commentBottomSheet: {

  position: "absolute",

  left: 0,
  right: 0,
  bottom: 0,

  height: "78%",

  backgroundColor: "#FFFFFF",

  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,

  paddingTop: 12,

  paddingHorizontal: 18,

  elevation: 20
},
commentHeader: {

  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",

  marginBottom: 20
},

commentTitle: {

  fontSize: 22,

  fontWeight: "700",

  color: "#222"
},

commentBubble: {

  backgroundColor: "#F3F4F6",

  padding: 14,

  borderRadius: 16,

  marginBottom: 12
},

commentInputRow: {

  flexDirection: "row",

  alignItems: "center",

  marginBottom: 40,

  marginTop: 10
},

commentInput: {

  flex: 1,

  backgroundColor: "#F3F4F6",

  borderRadius: 14,

  paddingHorizontal: 14,

  height: 50
},

sendBtn: {

  width: 50,
  height: 50,

  borderRadius: 14,

  backgroundColor: "#8B5CF6",

  justifyContent: "center",
  alignItems: "center",

  marginLeft: 10
},

colorGrid: {

  flexDirection: "row",

  flexWrap: "wrap",

  gap: 12,

  marginTop: 14
},

colorItem: {

  width: 42,
  height: 42,

  borderRadius: 21,

  borderWidth: 2,

  borderColor: "#EEE"
},

// ======================================================
// SHARE POPUP
// ======================================================

shareContainer: {
  flex: 1,
  backgroundColor: "#F4F4F4"
},

shareHeader: {

  paddingTop: 52,
  paddingBottom: 14,

  paddingHorizontal: 14,

  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",

  borderBottomWidth: 1,

  borderBottomColor: "#B7D7D0"
},

sharePopup: {

  flex: 1,

  backgroundColor: "#FFFFFF",

  marginTop: -10,

  borderTopLeftRadius: 26,
  borderTopRightRadius: 26,

  paddingHorizontal: 18,
  paddingTop: 16
},

shareTopMenu: {

  flexDirection: "row",

  justifyContent: "space-around",

  marginBottom: 20
},

shareMenuItem: {
  alignItems: "center"
},

circleMenu: {

  width: 58,
  height: 58,

  borderRadius: 29,

  backgroundColor: "#F1F1F1",

  justifyContent: "center",
  alignItems: "center",

  marginBottom: 8
},

menuText: {

  fontSize: 12,

  color: "#444"
},

previewCard: {

  backgroundColor: "#D7ECE7",
  overflow: "hidden",
  
  borderRadius: 12,

  padding: 14,

  alignItems: "center",

  marginBottom: 16
},

previewImage: {

  width: 170,
  height: 260,

  borderRadius: 10,

  resizeMode: "cover"
},

captionPreview: {

  borderWidth: 1,

  borderColor: "#B7D7D0",

  borderRadius: 12,

  padding: 14,

  marginBottom: 20,

  backgroundColor: "#FFF"
},

captionText: {

  fontSize: 14,

  lineHeight: 22,

  color: "#333"
},

printBtn: {

  backgroundColor: "#18864B",

  height: 54,

  borderRadius: 14,

  justifyContent: "center",
  alignItems: "center",

  marginBottom: 14
},

printText: {

  color: "#FFF",

  fontWeight: "700",

  fontSize: 15
},

downloadBtn: {

  borderWidth: 1,

  borderColor: "#B7D7D0",

  height: 54,

  borderRadius: 14,

  justifyContent: "center",
  alignItems: "center",

  backgroundColor: "#FFF"
},

downloadText: {

  color: "#333",

  fontWeight: "600",

  fontSize: 15
},
shareOverlay: {

  position: "absolute",

  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  backgroundColor:
    "rgba(0,0,0,0.15)",

  justifyContent: "flex-end"
},

shareModal: {

  backgroundColor: "#FFF",

  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,

  paddingTop: 12,

  paddingHorizontal: 18,

  height: "82%"
},

activeFontBtn: {

  borderWidth: 2,

  borderColor: "#00C853",

  backgroundColor: "#E8FFF1"
},

typeBtn: {

  flex: 1,

  paddingVertical: 12,

  borderRadius: 14,

  backgroundColor: "#F3F4F6",

  alignItems: "center",

  marginHorizontal: 4
},

activeTypeBtn: {

  backgroundColor: "#157541"
},

typeBtnText: {

  color: "#333",

  fontWeight: "600"
},

activeTypeBtnText: {

  color: "#FFF"
},

addTextBtn: {

  backgroundColor: "#157541",

  marginTop: 24,

  height: 54,

  borderRadius: 16,

  justifyContent: "center",

  alignItems: "center"
},

addTextBtnText: {

  color: "#FFF",

  fontSize: 16,

  fontWeight: "700"
},
activeElementBtn: {

  borderWidth: 2,

  borderColor: "#00C853",

  backgroundColor: "#E8FFF1"
},

homeBtn: {

  flexDirection: "row",

  alignItems: "center",

  gap: 6,

  backgroundColor: "#ffffff",

  borderWidth: 1.5,

  borderColor: "#ffffff",

  paddingHorizontal: 14,

  height: 42,

  borderRadius: 14
},

logoutOverlay: {

  flex: 1,

  backgroundColor:
    "rgba(0,0,0,0.45)",

  justifyContent: "center",

  alignItems: "center",

  paddingHorizontal: 24
},

logoutCard: {

  width: "100%",

  backgroundColor: "#FFF",

  borderRadius: 28,

  padding: 26,

  alignItems: "center"
},

logoutIconBox: {

  width: 74,

  height: 74,

  borderRadius: 999,

  backgroundColor: "#FFF3E0",

  justifyContent: "center",

  alignItems: "center",

  marginBottom: 18
},

logoutTitle: {

  fontSize: 22,

  fontWeight: "800",

  color: "#111",

  marginBottom: 10
},

logoutDesc: {

  fontSize: 15,

  color: "#666",

  textAlign: "center",

  lineHeight: 22,

  marginBottom: 26
},

logoutBtnRow: {

  flexDirection: "row",

  gap: 12,

  width: "100%"
},

cancelLogoutBtn: {

  flex: 1,

  height: 52,

  borderRadius: 16,

  backgroundColor: "#F3F4F6",

  justifyContent: "center",

  alignItems: "center"
},

confirmLogoutBtn: {

  flex: 1,

  height: 52,

  borderRadius: 16,

  backgroundColor: "#FF4D4F",

  justifyContent: "center",

  alignItems: "center"
},

cancelLogoutText: {

  fontSize: 15,

  fontWeight: "700",

  color: "#333"
},

confirmLogoutText: {

  fontSize: 15,

  fontWeight: "700",

  color: "#FFF"
},

saveOverlay: {

  flex: 1,

  backgroundColor:
    "rgba(0,0,0,0.35)",

  justifyContent: "center",

  alignItems: "center",

  paddingHorizontal: 24
},

saveCard: {

  width: "82%",

  backgroundColor: "#FFF",

  borderRadius: 30,

  paddingVertical: 34,

  paddingHorizontal: 24,

  alignItems: "center"
},

saveIconBox: {

  marginBottom: 18
},

saveTitle: {

  fontSize: 24,

  fontWeight: "800",

  color: "#111",

  marginBottom: 8
},

saveDesc: {

  fontSize: 15,

  color: "#666",

  textAlign: "center"
},
});