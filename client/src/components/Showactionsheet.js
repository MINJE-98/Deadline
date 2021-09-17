import React, { Component, createRef, useEffect, useState } from "react";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";

import { set_image } from "../redux/actions/DeadlineAction";
import { deadlinestyles } from "../styles/light/styles";
import { Alert } from "react-native";

const screen = Dimensions.get("screen");

function ShowActionSheet(props) {
  const { iteminfo } = useSelector((state) => state.ItemsReducer);
  const [img, setimg] = useState(null);
  const dispatch = useDispatch();
  const setImage = (uri) =>{
    dispatch(set_image(uri));
  }
  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("파일 접근 권한이 없습니다.");
        }
      }
    };
  },[iteminfo]);
  const ImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.images,
        allowsEditing: true,
        aspect: [2, 2],
        quality: 0.3,
      });
      if (!result.cancelled) {
        setimg(result.uri)        
        setImage(result.uri)
      } 
    } catch (e) {
      Alert.alert(e)
    }
  };
  const LanchCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 0.3,
      });
      if (!result.cancelled) {
        setimg(result.uri)        
        setImage(result.uri)
      }
    } catch (e) {
      Alert.alert(e)
    }
  };
  const _anchorRef = createRef();

  const _onOpenActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ["이미지 가져오기", "직접 촬영하기", "취소"];
    const destructiveButtonIndex = null;
    const cancelButtonIndex = 2;

      props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            ImagePick();
            break;
          case 1:
            LanchCamera();
            break;
          default:
            break;
        }
        // Do something here depending on the button index selected
      }
    );
  };
  return (
    <TouchableOpacity
      style={[
        deadlinestyles.imageButton,
        {
          width: screen.width > 380 ? 170 : 140,
          height: screen.width > 380 ? 170 : 140,
        },
      ]}
      onPress={_onOpenActionSheet}
      ref={_anchorRef}
    >
      {!iteminfo ? (
        <Image
          style={deadlinestyles.image}
          source={{uri: !img ? "https://deadline-store.s3.ap-northeast-2.amazonaws.com/no-image.png" : img}}
        />
      ) : (
        <Image
          style={deadlinestyles.image}
          source={{ uri: !img ? iteminfo.imageURL: img }}
        />
      )}
    </TouchableOpacity>
  );
}
const ImageSelector = connectActionSheet(ShowActionSheet);

export default ImageSelector;
