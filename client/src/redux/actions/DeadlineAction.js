import * as api from "../../api/Api";
import { errorhandler } from "./errorhandler";
import { s3 } from '../../config/AWSS3';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
// 엑션 타입입니다.
const DEADLINE_LIST_REQUEST = "DEADLINE_LIST_REQUEST";
const SET_DEADLINE = "SET_DEADLINE";
const GET_DEADLINE = "GET_DEADLINE";
const SET_IMAGE = "SET_IMAGE";

const uploadimage = async(barcode, teamuid, imageURL) =>{
  const response = await fetch(imageURL);
  const blob = await response.blob();
  let contentDeposition = 'inline;filename="' + imageURL + '"';
  return new Promise((resolve, reject)=>{
    s3.createBucket(() => {
      const params = {
        Bucket: `deadline-store`,
        Key: `${barcode}_${teamuid}.jpg`,
        Body: blob,
        ContentDisposition: contentDeposition,
        ContentType: "image/jpeg",
      };
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data.Location)
      });
    });
  })
}

/**
 * 유통기한 등록
 * 
 */
const set_deadline = (token, teamuid, goodsid, expdate, barcode, prodname, imageURL) => {
  return async (dispatch) => {
    try {
      // api 질의 대기
      dispatch({ type: DEADLINE_LIST_REQUEST });
      const URI = await uploadimage(barcode, teamuid, imageURL)
      // api 질의
      await api.set_deadline(token, teamuid, goodsid, expdate, barcode, prodname, URI);
      // // 질의 결과값 넘기기
      dispatch({ type: SET_DEADLINE, deadline: null });
    } catch (error) {
      errorhandler(error);
    }
  };
};

const get_deadline = (token, teamuid) => {
  return async (dispatch) => {
    try {
      // api 질의 대기
      dispatch({ type: DEADLINE_LIST_REQUEST });
      // api 질의
      const result1 = await api.get_deadline(token, teamuid);
      const data = result1.data.data;
      let result = {}
      let result2 = []

      data.forEach((element)=>{
          if (!result[element.expdate]){
              result[element.expdate] = [element]
          }
          else{
              result[element.expdate].push(element);
          }
      })
      Object.keys(result).forEach( element =>{
        result2.push({
          title: element,
          data: result[element]
        })
      })
      // 질의 결과값 넘기기
      dispatch({ type: GET_DEADLINE, deadline: result2 });
    } catch (error) {
      errorhandler(error);
    }
  };
};

const set_image = (imageurl) =>{
return async dispatch =>
dispatch({type: SET_IMAGE, image: imageurl})
}
export {
  DEADLINE_LIST_REQUEST,
  SET_DEADLINE,
  GET_DEADLINE,
  SET_IMAGE,
  set_deadline,
  get_deadline,
  set_image
  
};