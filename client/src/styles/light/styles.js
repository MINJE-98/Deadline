import { StyleSheet } from "react-native";

// 중앙에 컨텐츠들 모우는 기본 셋팅입니다.
const defaultStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

// 기본 폰트 스타일입니다.
const defaultFont = {
  fontSize: 18,
  color: "#3c444f",
  fontWeight: "700",
};

//기본 box 스타일입니다.
const defaultBox = {
  padding: 30,
  borderRadius: 10,
  backgroundColor: "white",
};

export const authstyles = StyleSheet.create({
  defaultStyle,
  defaultFont,
});
export const loading = StyleSheet.create({
  defaultStyle,
  defaultFont,
  blackWall: {
    position: "absolute",
    opacity: 0.5,
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
  loginWall: {
    position: "absolute", 
    opacity: 0.5, 
    backgroundColor: "black", 
    width: "100%", 
    height: "100%"
  },
});
export const homestyles = StyleSheet.create({
  defaultStyle,
  defaultBox,
  defaultFont,
  emptybutton: {
    margin: 15,
    width: "30%",
    alignItems: "center",
  },
  teambutton: {
    marginBottom: 20,
    width: "90%",
  },
  homeFont: {
    fontSize: 15,
  },
});
export const deadlinestyles = StyleSheet.create({
  defaultFont,
  defaultStyle,
  imageButton: {
    borderRadius: 100,
  },
  image: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    borderRadius: 100,
  },
  barcodeText: {
    fontSize: Platform.OS === "ios" ? 15 : 13,
    color: "#808080",
    // borderColor: "lightgray",
    // borderWidth: 2,
    fontWeight: "700",
  },
  confirmButton: {
    alignItems: "center",
    backgroundColor: "#ea4c89",
    paddingTop: "6.7%",
    height: "40%",
  },
  confirmText: {
    color: "#fff",
    alignContent: "center",
    fontSize: 18,
  },
});
export const modalstyles = StyleSheet.create({
  defaultStyle,
  defaultBox,
  defaultFont,
  // 설명 스타일
  exMessage: {
    color: "#808080",
    fontSize: 12,
    fontWeight: "bold",
    padding: 5,
  },
  // 텍스트 입력 스타일
  TextInput: {
    marginTop: 10,
    marginBottom: 10,
    height: 30,
    width: 180,
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
  },
  barcodeButton: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
    width: 90,
    padding: 12,
    borderRadius: 10,
  },
  footButton: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    width: "100%",
    padding: 12,
    borderRadius: 10,
  },
  listviewButton: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#ea4c89",
    alignItems: "center",
    marginTop: 20,
    padding: 12,
  },
  cancleButton: {
    borderColor: "#adb5bd",
    borderWidth: 1,
  },
  listviewitems: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
  listviewitemsimage: {
    width: "23%",
    height: 60,
  },
  cancleText: {
    color: "#adb5bd",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#ea4c89",
  },
  confirmText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export const headerstyles = StyleSheet.create({
  defaultFont,
  defaultStyle,
  headerTitle: {},
  headerRightIcon: {
    paddingRight: 5,
    padding: 10,
  },
  headerLeftIcon: {
    paddingLeft: 5,
    padding: 10,
  },

  HeaderLeftTitle: {
    paddingLeft: 20,
  },
});
