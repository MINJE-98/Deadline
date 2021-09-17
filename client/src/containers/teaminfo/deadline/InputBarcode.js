import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { team_search_item } from "../../../redux/actions/ItemsAction";
import ActionModal from "../../../components/Modal";
import { modalstyles } from "../../../styles/light/styles";

export default function InputBarcode({ navigation }) {
  const [isscanned, setIscanned] = useState(false);
  const [barcode, setBarcode] = useState(null);
  // 리둑스에서 토큰을 받아옵니다.
  const { token } = useSelector((state) => state.AuthReducer);
  // 리둑스에서 선택된 팀의 정보를 받아옵니다.
  const { selected_team } = useSelector((state) => state.TeamInfoRducer);
  const { isFetching } = useSelector((state) => state.ItemsReducer);

  const dispatch = useDispatch();

  // 팀내에 아이템 찾기
  const teamSearchItem = (token, barcode, teamuid) =>{
    dispatch(team_search_item(token, barcode, teamuid))
  }
  const Scan = (barcode) => {
    setIscanned(true)
    setBarcode(barcode)
    teamSearchItem(token, barcode, selected_team.tuid)
  };

  useEffect(()=>{
    if(isscanned){{
        if(!isFetching){
            setIscanned(false)
            navigation.goBack()
            navigation.navigate("DeadlineScreen",{barcode: barcode})
        }
        }
      }
  }, [isFetching])
  return (
    <ActionModal
      mainMessage="바코드를 입력해주세요!"
      exmessage={() => (
        <Text style={modalstyles.exMessage}>
          바코드 입력
        </Text>
      )}
      body={() => (
        <TextInput
          style={[modalstyles.TextInput, modalstyles.defaultFont]}
          textAlign={"center"}
          placeholder="바코드 입력"
          onChangeText={(Text) => setBarcode(Text)}
        ></TextInput>
      )}
      foot={() => (
        <>
          <TouchableOpacity
            style={[modalstyles.footButton, modalstyles.confirmButton]}
            onPress={() => Scan(barcode)}
          >
              {isFetching ? <ActivityIndicator size="small" color="#fff" />: <Text style={modalstyles.confirmText}>확인</Text>}
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
