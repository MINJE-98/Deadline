import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { homestyles } from '../styles/light/styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function TeamList(props){
    // const Admin = () =>(
    //     <FontAwesome5 name="star" size={40} color="#ea4c89" />
    // )
    return (
        <View style={[homestyles.defaultStyle]}>
            {
                props.state == 0
                ?
                // 어드민
                <TouchableOpacity style={[homestyles.defaultBox, homestyles.teambutton, { flexDirection: "row", alignItems: "center"  }]} onPress={props.onPress}>
                        {/* <Admin /> */}
                        <AntDesign name="star" size={40} color="#FFD400" style={{ paddingRight: 20}} />
                        <View>
                            <Text style={[homestyles.defaultFont, { fontSize: 15, color:"#808080" }]}>{props.tuid}</Text>
                            <Text style={[homestyles.defaultFont, { fontSize: 25 }]}>{props.name}</Text>
                        </View>
                </TouchableOpacity>
                :
                props.state == 1
                    ?
                    // 유저
                    <TouchableOpacity style={[homestyles.defaultBox, homestyles.teambutton, { flexDirection: "row", mbackgroundColor: "white", alignItems: "center" }]} onPress={props.onPress}>
                        <AntDesign name="star" size={40} color="#000" style={{ paddingRight: 20}} />
                        <View>
                            <Text style={[homestyles.defaultFont, { fontSize: 15, color:"#808080" }]}>{props.tuid}</Text>
                            <Text style={[homestyles.defaultFont, { fontSize: 25 }]}>{props.name}</Text>
                        </View>
                    </TouchableOpacity>
                    :        
                    // 가입
                    <View style={[homestyles.defaultBox, homestyles.teambutton, { flexDirection: "row", backgroundColor: "gray", alignItems: "center" }]}>
                        <AntDesign name="star" size={40} color="#000" style={{ paddingRight: 20}} />
                        <View>
                            <Text style={[homestyles.defaultFont, { fontSize: 15 }]}>{props.tuid}</Text>
                            <Text style={[homestyles.defaultFont, { fontSize: 25 }]}>{props.name}</Text>
                        </View>
                    </View>
                

            }
        </View>
    )
}