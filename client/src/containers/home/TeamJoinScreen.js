import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, Alert } from "react-native";
// 리둑스 훅
import { useSelector, useDispatch } from "react-redux";
// 사용할 액션
import { set_teamlist } from "../../redux/actions/TeamAction";
import * as api from "../../api/Api";
import ActionModal from "../../components/Modal";
import { modalstyles } from "../../styles/light/styles";

export default function TeamJoinScreen({ navigation }) {
  const { token } = useSelector((state) => state.AuthReducer);
  const [teamUid, setTeamUid] = useState(null);
  const dispatch = useDispatch();
  const setTeamList = () => {
    dispatch(set_teamlist(token));
  };
  /**
   * 팀에 가입합니다.
   *
   * 1. 상태 코드를 가입신청으로 유저가 팀에 가입합니다.
   * 2. 팀리스트를 업데이트 합니다.
   *
   */
  const jointeam = () => {
    if (!teamUid) Alert.alert("", "UID를 입력해주세요!");
    else {
      Alert.alert("팀 가입", "팀에 가입하시겠습니까?", [
        { text: "취소", style: "cancel" },
        {
          text: "확인",
          onPress: async () => {
            try {
              // 1. 상태 코드를 가입신청으로 유저가 팀에 가입합니다.
              const result = await api.join_team(token, teamUid, 2);
              Alert.alert("", result.data.message, [
                {
                  test: "확인",
                  onPress: () => {
                    // 2. 팀리스트를 업데이트 합니다.
                    setTeamList();
                    navigation.goBack();
                  },
                },
              ]);
            } catch (error) {
              if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                if (error.response.status === 404) {
                  Alert.alert("", error.response.data.message, [
                    { text: "확인" },
                  ]);
                } else {
                  Alert.alert("알수없는 에러!", error.response.data, [
                    { text: "확인" },
                  ]);
                }
              } else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                Alert.alert("", "통신을 실패하였습니다.");
              } else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log("Error", error.message);
              }
            }
          },
        },
      ]);
    }
  };
  return (
    <ActionModal
      mainMessage="팀 UID를 입력해주세요."
      exmessage={() => (
        <Text style={modalstyles.exMessage}>
          팀 UID는 영문, 숫자 혼합하여 6자리입니다.
        </Text>
      )}
      body={() => (
        <TextInput
          style={[modalstyles.TextInput, modalstyles.defaultFont]}
          textAlign={"center"}
          placeholder="팀 UID 입력"
          onChangeText={(Text) => setTeamUid(Text)}
        ></TextInput>
      )}
      foot={() => (
        <>
          <TouchableOpacity
            style={[modalstyles.footButton, modalstyles.confirmButton]}
            onPress={() => jointeam()}
          >
            <Text style={modalstyles.confirmText}>가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[modalstyles.footButton, modalstyles.cancleButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={modalstyles.cancleText}>취소</Text>
          </TouchableOpacity>
        </>
      )}
    />
  );
}
