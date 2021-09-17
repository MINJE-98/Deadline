import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, Alert } from "react-native";
// 리둑스 훅
import { useSelector, useDispatch } from "react-redux";
// 사용할 액션
import { set_teamlist } from "../../redux/actions/TeamAction";
import * as api from "../../api/Api";
import ActionModal from "../../components/Modal";
import { modalstyles } from "../../styles/light/styles";

export default function MakeTeamScreen({ navigation }) {
  const { token } = useSelector((state) => state.AuthReducer);
  const [teamName, setTeamName] = useState(null);
  const dispatch = useDispatch();
  const setTeamList = () => {
    dispatch(set_teamlist(token));
  };
  // 무작위 teamUID를 생성합니다.
  const teamUID = () => {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
  };

  /**
   * 팀을 생성합니다.
   *
   * 1. 유저로 부터 팀이름을 받고, 조건에 맞는 팀이름인지 확인합니다.
   * 2. 팀을 생성합니다.
   * 3. 생성한 팀에 관리자 권한으로 가입합니다.
   */
  const maketeam = () => {
    // 1. 유저로 부터 팀이름을 받고, 조건에 맞는 팀이름인지 확인합니다.
    // 길이 10자 이내
    if (!teamName || teamName.length > 11)
      Alert.alert("", "팀 이름을 확인해주세요.");
    else {
      Alert.alert("팀 생성", "팀을 생성하시겠습니까?", [
        { text: "취소", style: "cancel" },
        {
          text: "확인",
          onPress: async () => {
            try {
              const teamuid = teamUID();
              // 2. 팀을 생성합니다.
              const result = await api.set_team(token, teamuid, teamName);
              // 팀생성에 성공하였을떄.
              if (result.status == 200) {
                // 3. 생성한 팀에 관리자 권한으로 가입합니다.
                await api.join_team(token, teamuid, 0);
                Alert.alert("", result.data.message, [
                  {
                    test: "확인",
                    onPress: () => {
                      setTeamList();
                      navigation.goBack();
                    },
                  },
                ]);
              }
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
      mainMessage="팀 이름을 입력해주세요!"
      exmessage={() => (
        <Text style={modalstyles.exMessage}>
          팀 이름은 최대 10자까지 입력 가능합니다.
        </Text>
      )}
      body={() => (
        <TextInput
          style={[modalstyles.TextInput, modalstyles.defaultFont]}
          textAlign={"center"}
          placeholder="팀 이름 입력"
          onChangeText={(Text) => setTeamName(Text)}
        ></TextInput>
      )}
      foot={() => (
        <>
          <TouchableOpacity
            style={[modalstyles.footButton, modalstyles.confirmButton]}
            onPress={() => maketeam()}
          >
            <Text style={modalstyles.confirmText}>생성</Text>
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
