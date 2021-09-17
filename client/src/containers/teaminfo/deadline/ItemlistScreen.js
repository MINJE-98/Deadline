import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ActionModal from "../../../components/Modal";
import { modalstyles } from "../../../styles/light/styles";
import {
  fork_item,
  team_search_item,
} from "../../../redux/actions/ItemsAction";

export default function Itemlist({ navigation }) {
  const [isload, setIsload] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { iteminfo, itemlist, isFetching } = useSelector(
    (state) => state.ItemsReducer
  );
  // 토큰을 불러옵니다.
  const { token } = useSelector((state) => state.AuthReducer);
  // 선택된 팀을 불러옵니다.
  const { selected_team } = useSelector((state) => state.TeamInfoRducer);

  const dispatch = useDispatch();
  const forkItem = (token, barcode, prodname, teamuid, imageURL, goodsid) => {
    dispatch(fork_item(token, barcode, prodname, teamuid, imageURL, goodsid));
  };
  // 팀내에 아이템 찾기
  const teamSearchItem = (token, barcode, teamuid) => {
    dispatch(team_search_item(token, barcode, teamuid));
  };

  useEffect(() => {
    console.log(itemlist);
  }, [itemlist, isFetching]);

  return (
      <ActionModal
        mainMessage="다른 팀에서 등록한 상품 정보입니다."
        exmessage={() => (
          <Text style={modalstyles.exMessage}>
            다른 팀에서 등록한 상품을 사용해보세요!
          </Text>
        )}
        body={() =>
          isFetching ? (
            <View style={{ height: 200, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#ff0000" />
            </View>
          ) : (
            <FlatList
              style={{ width: "100%", height: 330 }}
              data={itemlist}
              ListEmptyComponent={
                <View style={modalstyles.defaultStyle}>
                  <Text style={modalstyles.defaultFont} >등록된 상품이 없습니다.</Text>
                </View>
              }
              keyExtractor={(item) => item.goodsid.toString()}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      width: "100%",
                      borderBottomColor: "lightgray",
                      borderBottomWidth: 1,
                    }}
                  >
                    <TouchableOpacity
                      style={modalstyles.listviewitems}
                      onPress={() => {
                        Alert.alert(
                          "",
                          `${item.teamname}팀의 ${item.goodsname}\n 상품정보를 사용하시겠습니까?`,
                          [
                            { text: "취소", style: "cancel" },
                            {
                              text: "확인",
                              onPress: () => {
                                setIsload(true);
                                setBarcode(item.barcode);
                                forkItem(
                                  token,
                                  item.barcode,
                                  item.goodsname,
                                  selected_team.tuid,
                                  item.imageURL,
                                  item.goodsid
                                );
                                navigation.goBack();
                              },
                            },
                          ]
                        );
                      }}
                    >
                      {console.log(item.imageURL)}
                      <Image
                        style={[modalstyles.listviewitemsimage, { borderRadius: 2}]}
                        source={{uri: item.imageURL}}
                      />
                      <View
                        style={{
                          flexDirection: "column",
                          marginLeft: 10,
                          width: "72%",
                        }}
                      >
                        <Text
                          style={[modalstyles.defaultFont, { fontSize: 16 }]}
                        >
                          {item.goodsname}
                        </Text>
                        <Text
                          style={[modalstyles.defaultFont, { fontSize: 12 }]}
                        >
                          {item.teamname}
                        </Text>
                      </View>
                      <Text style={[modalstyles.defaultFont, { fontSize: 15 }]}>
                        {item.usecount}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )
        }
        foot={() => (
          <>
            <TouchableOpacity
              style={modalstyles.listviewButton}
              onPress={() => navigation.goBack()}
            >
              {isFetching ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={modalstyles.confirmText}>직접 추가</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      />
  );
}

const styles = StyleSheet.create({});
