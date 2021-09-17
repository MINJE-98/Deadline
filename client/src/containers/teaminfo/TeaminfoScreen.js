import React, { Component, useEffect, useState } from "react";
import {
  View,
  SectionList,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { get_deadline } from "../../redux/actions/DeadlineAction";
import Skeletonloading from "../../components/Skeletonloading";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { deadlinestyles, homestyles } from "../../styles/light/styles";

export default function TeamInfoScreen({ navigation }) {
  // const [teamInfo, setTeamInfo] = useState(null)
  const { selected_team } = useSelector((state) => state.TeamInfoRducer);
  // 토큰을 불러옵니다.
  const { token } = useSelector((state) => state.AuthReducer);
  // 토큰을 불러옵니다.
  const { deadline, isFetching } = useSelector(
    (state) => state.DeadlineReducer
  );
  const Dispatch = useDispatch();

  const refreshDeadlinelist = () => {
    Dispatch(get_deadline(token, selected_team.tuid));
  };

  useEffect(() => {
    refreshDeadlinelist()
  }, []);
  return (
    <>
      { 
        isFetching ?
          <Skeletonloading />
        :
      <SectionList
        style={{ width: "100%" }}
        sections={deadline}
        refreshing={isFetching}
        onRefresh={refreshDeadlinelist}
        ListEmptyComponent={()=> (

          <View style={homestyles.defaultStyle}>
            <Text style={[deadlinestyles.defaultFont, { color: "#808080" }]}>등록된 유통기한이 없습니다!</Text>
              <TouchableOpacity onPress={()=> navigation.navigate('ScanScreen')} style={[homestyles.defaultBox, homestyles.emptybutton, { width: "90%" }]}>
                <MaterialCommunityIcons name="barcode-scan" color="#3c444f" size={50} style={{ marginBottom: 10 }}/>
                <Text style={[homestyles.defaultFont, homestyles.homeFont]}>상품 스캔</Text>
              </TouchableOpacity>
          </View>
        ) } 
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={{ flexDirection: "row", width: "100%", marginBottom: 12 }}>
              <Image style={{ width: "20%", height: 80, borderRadius: 6 }} source={{uri: item.imageURL}}/>
              <View style={{ marginLeft: 12, width: "75%"}}>
                <Text style={[deadlinestyles.defaultFont, { fontSize: 14, color: "#808080" }]}>{item.barcode}</Text>
                <Text style={[deadlinestyles.defaultFont, { fontSize: item.goodsname.length < 18 ? 18 : 14 }]}>{item.goodsname}</Text>
                <View style={{ padding: 2 }}>
                {/* <Text style={[deadlinestyles.defaultFont, { fontSize: 10 }]}>{item.tagname}</Text> */}
                </View>
              </View>
              {/* <View style={{ justifyContent: "center" }}> */}
              {/* <FontAwesome name="angle-right" size={40} color="#808080" /> */}
              {/* </View> */}
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({ section: { title } }) => {
          const expiredate = new Date(title);
          const now  = new Date();
          const expiredateClear = `${expiredate.getFullYear()}-${("0" + (1 + expiredate.getMonth())).slice(-2)}-${("0" + expiredate.getDate()).slice(-2)}`
          const expiredateArray = expiredateClear.split('-')
          const exprireNum = new Date(expiredateArray[0], expiredateArray[1]-1, expiredateArray[2]);
          const result = Math.ceil(((now-exprireNum)/(1000*3600*24)*-1))
          return(
          <View style={[deadlinestyles.defaultStyle, { marginBottom: 12, backgroundColor: "lightgray", flexDirection: "row", justifyContent: "flex-start" }]}>
            <View style={{ marginLeft: 5 }}>
              {result > 0 ? <FontAwesome name="circle" size={18} color="#77DD77" /*06A66C*/ /> : <FontAwesome name="circle" size={18} color="#FF4400" />}
            </View>
            <Text
              style={[
                deadlinestyles.defaultFont,
                { marginLeft: 10 },
              ]}
            >
              {/* <View style={{ backgroundColor: "black", width: 10, height: 10 }}> */}
              {/* </View> */}
              {expiredateClear}
            </Text>
          </View>
        )}}
      />
      }
    </>
  );
}
