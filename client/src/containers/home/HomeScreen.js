import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
// 리둑스 훅
import { useSelector, useDispatch } from 'react-redux';


// 사용할 액션
import { set_teamlist } from '../../redux/actions/TeamAction'
import { select_team } from '../../redux/actions/TeamInfoAction'
import { homestyles } from '../../styles/light/styles'
import TeamList from '../../components/Teamlist';
import { get_deadline } from "../../redux/actions/DeadlineAction";

/**
 * HOME 스크린입니다.
 * 1. 
 */

export default function HomeScreen({ navigation }){
  // 로딩 모달 상태값
  const [isload, setIsload] = useState(false);
  // 토큰
  const { token } = useSelector( state => state.AuthReducer)
  // 팀리스트
  const { teamlist } = useSelector( state => state.TeamReducer)
  const dispatch = useDispatch();
  
  useEffect(()=>{
    refreshTeamlist()
    console.log(token);
  },[])
  const getDeadline = (token, teamuid) => {
    dispatch(get_deadline(token, teamuid));
  };
  // 팀리스트 새로고침
  const refreshTeamlist = () => {
    setIsload(true);
    dispatch(set_teamlist(token));
    setIsload(false);
  };
  // 팀선택
  const selectTeam = (teaminfo) =>{
    dispatch(select_team(teaminfo));
  }
  // 팀리스트의 값이 없을 경우.
  const _renderEmptyComponent = () =>(
    <View style={homestyles.defaultStyle}>
      <Text style={[homestyles.defaultFont, homestyles.homeFont]}>팀에 소속되어 있지 않습니다.</Text>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={()=> navigation.navigate('MakeTeam')} style={[homestyles.defaultBox, homestyles.emptybutton]}>
          <Icon name="group-add" size={30} color="#3c444f"/>
          <Text style={[homestyles.defaultFont, homestyles.homeFont]}>팀 생성</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('JoinTeam')} style={[homestyles.defaultBox, homestyles.emptybutton]}>
          <Icon name="email" size={30} color="#3c444f"/>
          <Text style={[homestyles.defaultFont, homestyles.homeFont]}>팀 가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  // 팀리스트의 값이 있는 경우
  const _renderComponent = (item) =>(
      <>
      {/* {console.log(item)} */}
      <TeamList 
        state={item.state}
        tuid={item.tuid}
        name={item.name}
        onPress={()=> {
          selectTeam(item)
          getDeadline(token, item.tuid); 
          navigation.navigate('Team')
        }}
      />
      </>
  )
  return (
    <FlatList　
    style={{width: "100%", height: "100%"}}
    data={teamlist}
    refreshing={isload}
    onRefresh={refreshTeamlist}
    ListEmptyComponent={()=> _renderEmptyComponent() } 
    keyExtractor={(item)=> item.tuid}
    renderItem={({item}) => _renderComponent(item)} />
  )
}