import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../../components/Loading";
import { team_search_item } from "../../../redux/actions/ItemsAction";
import { deadlinestyles } from '../../../styles/light/styles'

/**
 * 스캔 스크린입니다.
 *
 */
export default function ScanScreen({ navigation }) {
  // 현재 스캔상태
  const [isscanned, setIscanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [barcode, setBarcode] = useState(null);
  // 리둑스에서 토큰을 받아옵니다.
  const { token } = useSelector((state) => state.AuthReducer);
  // 리둑스에서 선택된 팀의 정보를 받아옵니다.
  const { selected_team } = useSelector((state) => state.TeamInfoRducer);

  const { iteminfo, isFetching } = useSelector((state) => state.ItemsReducer);
  const dispatch = useDispatch();

  // 팀내에 아이템 찾기
  const teamSearchItem = (token, barcode, teamuid) =>{
    dispatch(team_search_item(token, barcode, teamuid))
  }

  useEffect(() => {
    // 카메라 권한 확인
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status !== "granted") {
        alert("카메라 권한이 없습니다.");
      }
    })();
    if(isscanned){
      if(isFetching){
        setModalVisible(true)
      }else{
        setModalVisible(false)
        setIscanned(false)
        navigation.navigate("DeadlineScreen",{barcode: barcode})
      }
    }
  }, [iteminfo, isFetching]);

  // 스캔!
  const Scanned = ({ type, data }) => {
    setIscanned(true)
    setBarcode(data)
    teamSearchItem(token, data, selected_team.tuid)
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "92%" }}>
        <BarCodeScanner
          onBarCodeScanned={isscanned ? undefined : Scanned}
          style={{ width: "100%", height: "100%" }}
        />
        <View
          style={{
            width: "100%",
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => Scanned({data: 12332})}
          >
            <FontAwesome name="circle" size={90} />
          </TouchableOpacity> */}
          <Text onPress={() => Scanned({data: 123})} style={[ deadlinestyles.defaultFont ]} >바코드를 스캔해주세요!</Text>
          <Loading animationType={"none"} visible={modalVisible} />
        </View>
        {/* 
      </View>
      <View>
        {this.state.barcodetype == 0 ? (
          <Text>상품의 바코드를 입력하여 등록하세요!</Text>
        ) : this.state.barcodetype == 1 ? (
          <Text>상품 바코드를 스캔하여 상품을 등록하세요!</Text>
        ) : (
          <Text>사진을 찍고 상품을 등록하세요!</Text>
        )}
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {this.state.cameramode ? (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ padding: 30 }}
              onPress={() => this.setState({ cameramode: false })}
            >
              <MaterialIcons name="arrow-back" size={50} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 20 }}>
              <FontAwesome name="circle" size={90} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity>
              <FontAwesome name="pencil-square-o" size={20} />
              <Text
                style={{ borderColor: "black", borderWidth: 1 }}
                onPress={() => {
                  navigation.navigate("inputcode");
                }}
              >
                바코드입력
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome name="barcode" size={20} />
              <Text
                style={{ borderColor: "black", borderWidth: 1 }}
                onPress={() => {
                  this.context.scancode();
                  scanbarcode(
                    this.state.token,
                    12332,
                    this.context.teaminfo.tuid,
                    this.props
                  );
                }}
              >
                바코드 스캔
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome name="camera-retro" size={20} />
              <Text
                style={{ borderColor: "black", borderWidth: 1 }}
                onPress={() => {
                  this.context.snapcode();
                  this.setState({ barcodetype: 2, cameramode: true });
                }}
              >
                바코드 없는 상품
              </Text>
            </TouchableOpacity>
          </>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
});
