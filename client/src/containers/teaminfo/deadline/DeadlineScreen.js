import React, { useState, useEffect } from "react";
import { TextInput, TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useSelector, useDispatch } from "react-redux";
import { TextInputMask } from "react-native-masked-text";

import { total_search_item } from "../../../redux/actions/ItemsAction";
import ImageSelector from "../../../components/Showactionsheet";
import Loading from "../../../components/Loading";
import Deadline from "../../../components/Deadline";
import { deadlinestyles } from "../../../styles/light/styles";
import { Alert } from "react-native";
import { set_deadline } from "../../../redux/actions/DeadlineAction";
import LoadingScreen from "../../../components/Loading";
/**
 * 스캔 스크린입니다.
 *
 */

export default function ScanScreen({ route, navigation }) {
  const now = new Date();
  const dispatch = useDispatch();
  // 훅
  const [prodname, setName] = useState(null);
  const [prodbarcode, setBrocde] = useState(route.params.barcode);
  const [prodimageURL, setImageURL] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectCheck, setslectCheck] = useState(false);
  const [date, setdate] = useState(
    `${now.getFullYear()}-${("0" + (1 + now.getMonth())).slice(-2)}-${(
      "0" + now.getDate()
    ).slice(-2)}`
  );

  // 토큰을 불러옵니다.
  const { token } = useSelector((state) => state.AuthReducer);
  // 선택된 팀을 불러옵니다.
  const { selected_team } = useSelector((state) => state.TeamInfoRducer);

  // 팀이 등록한 아이템정보를 불러옵니다.
  const { iteminfo } = useSelector((state) => state.ItemsReducer);

  const { done, deadline, image ,isFetching } = useSelector((state) => state.DeadlineReducer);

  // 전체 아이템 찾기
  const totalSearchItem = (token, barcode, teamuid) =>
    dispatch(total_search_item(token, barcode, teamuid));
  // 유통기한 등록
  const setDeadline = (token, teamuid, goodsid, expdate, barcode, prodname, imageURL) =>{
    dispatch(set_deadline(token, teamuid, goodsid, expdate, barcode, prodname, imageURL))
  };

  useEffect(() => {
    // 팀이 아이템을 가지고 있지 않을 경우.
    // 전체 팀이 등록한 아이템리스트를 가져옵니다.
    console.log("re");
    // 팀에 아이템이 없어서 전체 팀들이 가지고있는 아이템을 보여줌
    // error 뭔가가 변경되면 다시 올아온다.
    if (!iteminfo) {
      if(!selectCheck){
        setModalVisible(true)
        setTimeout(() => {
          totalSearchItem(token, prodbarcode, selected_team.tuid);
          navigation.navigate("Itemlist");
          setslectCheck(true)
          setModalVisible(false)
        }, 1000);
      }
    } 
    // 팀이 아이템을 가지고 있음
    if(!!iteminfo){
      console.log(iteminfo.imageURL);
      setImageURL(iteminfo.imageURL);
      setName(iteminfo.name);
    }

    // 로컬에서 사용자가 사진을 변경하였음.
    if(!!image) {
      console.log(image);
      setImageURL(image)
    }
    if(done){
      Alert.alert("", "등록이 완료되었습니다.", [{text: "확인", onPress: ()=> navigation.navigate('ScanScreen')}])
    }
  }, [image, iteminfo, isFetching]);
  return (
    <ActionSheetProvider>
      <View>
        <Deadline
          ImageSelector={() => <ImageSelector result={prodimageURL} />}
          Barcode={prodbarcode}
          // 날짜 입력 컴포넌트
          InputDateMask={() => (
            <TextInputMask
              style={[
                deadlinestyles.defaultFont,
                { fontSize: 18, width: "100%", color: "#3c444f" },
              ]}
              type={"datetime"}
              options={{
                format: "YYYY-MM-DD",
              }}
              placeholder={`${now.getFullYear()}-${(
                "0" +
                (1 + now.getMonth())
              ).slice(-2)}-${("0" + now.getDate()).slice(-2)}`}
              value={date}
              onChangeText={(text) => {
                setdate(text);
              }}
            />
          )}
          // 상품명 컴포넌트
          InputProdName={() => (
            <TextInput
              style={[
                deadlinestyles.defaultFont,
                { width: 250, color: "#3c444f", overflow: "scroll" },
              ]}
              placeholder="제품명을 입력해주세요."
              onChangeText={(Text) => setName(Text)}
            >
              {prodname}
            </TextInput>
          )}
          AddProd={() => (
            <>
              {isFetching ? (
                <View style={[deadlinestyles.confirmButton]}>
                  <ActivityIndicator size="large" color="#fff" />
                </View>

              ) : (
                <TouchableOpacity
                  style={deadlinestyles.confirmButton}
                  onPress={() => {
                    Alert.alert("", "유통기한을 등록하시겠습니까?", [
                      { text: "취소", style: "cancel" },
                      {
                        text: "확인",
                        onPress: async () => {
                          setDeadline(
                            token,
                            selected_team.tuid,
                            iteminfo == undefined ? null : iteminfo.goodsid,
                            date,
                            prodbarcode,
                            prodname,
                            prodimageURL
                          );
                        },
                      },
                    ]);
                  }}
                >
                  <Text
                    style={[
                      deadlinestyles.defaultFont,
                      deadlinestyles.confirmText,
                    ]}
                  >
                    유통기한 등록
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        />
        <LoadingScreen aniType={"none"} visible={modalVisible}/>
      </View>
    </ActionSheetProvider>
  );
}