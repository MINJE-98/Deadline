import React from "react";
import { View, Text, Dimensions} from "react-native";
import Inputbox from "./InputBox";
import { deadlinestyles } from "../styles/light/styles";
import { Platform } from "react-native";
const screen = Dimensions.get("screen");
export default function Deadline(props) {
  return (
    <View>
      {/** TOP  */}
      <View
        style={{
          flexDirection: "column",
          padding: 30,
          width: "100%",
          height: screen.height / 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.ImageSelector()}
        <View style={{ padding: 10 }}>
          <Text
            style={deadlinestyles.barcodeText}
            onPress={() => alert(props.Barcode)}
          >
            {props.Barcode}
          </Text>
        </View>
      </View>
      {/** MID */}
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          height: Platform.OS === "ios" ?  screen.height < 780 ? screen.height / 2.1 : screen.height /  2.18
          : screen.height < 780 ? screen.height / 2.2 : screen.height /  2.42,
          alignItems: "center",
        }}
      >
        {console.log(screen)}
        <Inputbox IconName={"shopping-cart"} Inputbox={props.InputProdName()} />
        <Text
          style={[
            deadlinestyles.defaultFont,
            {
              textAlign: "left",
              width: "80%",
              paddingTop: 20,
              fontSize: 15,
              color: "#808080"
            },
          ]}
        >
          유통기한
        </Text>
        <Inputbox IconName={"calendar"} Inputbox={props.InputDateMask()} />
        <Inputbox
          IconName={"tag"}
          Inputbox={<Text style={[deadlinestyles.defaultFont, { color: "#3c444f"}]}>유제품</Text>}
        />
      </View>
      {/* 
        BOT 
        TODO: 
        1. 상품 정보가 수정되었거나, 새로운 등록일 경우
        2. 유통기한 등록
      */}
      <View>{props.AddProd()}</View>
      {/* <Loading animationType={"none"} visible={props.modalVisible} /> */}
    </View>
  );
}

/*
if (prodname == "") Alert.alert("", "상품 이름을 입력해주세요.");
              else {
                Alert.alert("", "추가 하시겠습니까?", [
                  { text: "취소", style: "cancel" },
                  {
                    text: "확인",
                    onPress: async () => {
                      try {
                        alert(
                          prodname + " " + prodbarcode + " " + prodimageURL
                        );
                        await api.set_item(
                          token,
                          prodbarcode,
                          prodname,
                          selected_team.tuid
                        );
                      } catch (error) {
                        if (error.response) {
                          if (error.response.data.error_code == "1006")
                            Alert.alert("", error.response.message);
                          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                          if (error.response.status === 404) {
                          } else {
                            Alert.alert("40*에러", error.response.message);
                          }
                        } else if (error.request) {
                          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                          Alert.alert("통신을 실패", "통신 실패하였습니다.");
                        } else {
                          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                          console.log("Error", error.message);
                        }
                      }
                    },
                  },
                ]);
              }
 */
