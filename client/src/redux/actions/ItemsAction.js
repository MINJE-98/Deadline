import React from 'react'
import { Alert } from 'react-native'
import * as api from "../../api/Api";
import { errorhandler } from './errorhandler'

// 엑션 타입입니다.
const ITEMS_LIST_REQUEST = "ITEMS_LIST_REQUEST"
const TEAM_SEARCH_ITEM = "TEAM_SEARCH_ITEM";
const SET_ITEM = "SET_ITEM";
const FORK_ITEM = "FORK_ITEM";
const TOTAL_SEARCH_ITEM = "TOTAL_SEARCH_ITEM";
const ITEMS_ERROR = "ITEMS_ERROR"

const set_item = (token, barcode, prodname, teamuid, imageURL) =>{
  return async (dispatch) => {
    try {
      // api 질의 대기
      dispatch({ type: ITEMS_LIST_REQUEST })
      // api 질의
      const result = await api.set_item(token, barcode, prodname, teamuid, imageURL);
      // 질의 결과값 넘기기
      dispatch({ type: SET_ITEM, iteminfo: result.data.data });
    } catch (error) {
      errorhandler(error)
    }
  }
}

const fork_item = (token, barcode, prodname, teamuid, imageURL, goodsid) =>{
  return async (dispatch) => {
    try {
      // api 질의 대기
      dispatch({ type: ITEMS_LIST_REQUEST })
      // api 질의
      const result = await api.fork_item(token, barcode, prodname, teamuid, imageURL, goodsid);
      // 질의 결과값 넘기기
      dispatch({ type: FORK_ITEM, iteminfo: result.data.data[0] });
    } catch (error) {
      errorhandler(error)
    }
  }
}

/**
 * 팀에 상품이 등록한 상품 정보를 받습니다.
 */
const team_search_item = (token, barcode, teamuid) => {
  return async (dispatch) => {
    try {
      // api 질의 대기
      dispatch({ type: ITEMS_LIST_REQUEST })
      // api 질의
      const result = await api.team_search_item(token, barcode, teamuid);
      console.log(result);
      // 질의 결과값 넘기기
      dispatch({ type: TEAM_SEARCH_ITEM, iteminfo: result.data.data[0] });
    } catch (error) {
      errorhandler(error)
    }
  };
};

/**
 * 아이템 리스트를 받습니다.
 */
const total_search_item = (token, barcode, teamuid) => {
  return async (dispatch) => {
    try {
      // api 질의 대기
      dispatch({ type: ITEMS_LIST_REQUEST })
      // api 질의
      const result = await api.total_search_item(token, barcode, teamuid);
      // 질의 결과값 넘기기
      dispatch({ type: TOTAL_SEARCH_ITEM, itemlist: result.data.data });
    } catch (error) {
      errorhandler(error)
    }
  };
};

export {
  TEAM_SEARCH_ITEM,
  TOTAL_SEARCH_ITEM,
  ITEMS_ERROR,
  ITEMS_LIST_REQUEST,
  SET_ITEM,
  FORK_ITEM,
  team_search_item,
  total_search_item,
  set_item,
  fork_item
};
