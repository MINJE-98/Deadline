import axios from 'axios';
import { config } from '../config/ApiURL'
/******************
 ****** AUTH ******
 ******************/

// 유저 정보를 가져옵니다.
// GET /api/auth
// headers: token
// params: null
export const get_user = ( token ) =>{
    return axios.get(`${config.API_URL}/api/auth`,{
        headers:{
            token: token
        }
    });
}
// 유저 정보를 저장합니다.
// POST /api/auth
// headers: token
// params: null
export const set_user = ( token ) =>{
    return axios.post(`${config.API_URL}/api/auth`,{},{
        headers:{
            token: token
        }
    });
}

/******************
 ****** TEAMS ******
 ******************/

// 팀을 생성합니다.
// POST /api/teams
// headers: token
// params: teamuid, teamname
export const set_team = (token, teamuid, teamname) =>{
    return axios.post(`${config.API_URL}/api/teams?teamuid=${teamuid}&teamname=${teamname}`,{},{
        headers:{
            token: token
        }}
    );
}

// POST /api/teams/members?teamuid={temauid}&state={state}
// 팀에 가입합니다.
// headers: token
// params: teamuid, state
export const join_team = (token, teamuid, state) =>{
    return axios.post(`${config.API_URL}/api/teams/members?teamuid=${teamuid}&state=${state}`,{},{
        headers:{
            token: token
        }}
    );
}
// GET /api/teams/members/teamlist
// 한 유저가 가입한 팀리스트를 가져옵니다.
// headers: token
export const get_user_teamlist = (token) =>{
    return axios.get(`${config.API_URL}/api/teams/members/teamlist`,{
        headers: {
            token: token
        }
    });
}

///////////// 팀UID가 현재 유저가 가지고있는지 검증 //////////////////

/******************
 ****** ITEMS ******
 ******************/



// GET /api/items?barcode={barcode}&teamuid={teamuid}
// 팀에 상품에 있는지 확인합니다.
// headers: token
// params: barcode, teamuid
export const team_search_item = (token, barcode, teamuid) =>{
    return axios.get(`${config.API_URL}/api/items?barcode=${barcode}`,{
        headers: {
            token: token,
            teamuid: teamuid
        }
    });
}

// GET /api/items/list?barcode={barcode}
// 상품 정보 리스트를 전부 받아옵니다.
// headers: token
// params: barcode
export const total_search_item = (token, barcode, teamuid) =>{
    return axios.get(`${config.API_URL}/api/items/list?barcode=${barcode}`,{
        headers: {
            token: token,
            teamuid: teamuid
        }
    });
}

// POST /api/items?barcode={barcode}&prodname={prodname}&teamuid={teamuid}&imageURL={imageURL}
// 아이템 생성
// headers: token, teamuid
// params: token, barcode, prodname, teamuid, imageURL
export const set_item = (token, teamuid, barcode, prodname,  imageURL) =>{
    return axios.post(`${config.API_URL}/api/items?barcode=${barcode}&prodname=${prodname}&imageURL=${imageURL}`,{},{
        headers:{
            token: token,
            teamuid: teamuid
        }}
    );
}

// POST /api/items/fork?barcode={barcode}&prodname={prodname}&teamuid={teamuid}&imageURL={imageURL}&goodsid={goodsid}
// 아이템 복사
// headers: token, teamuid
// params: token, barcode, prodname, teamuid, imageURL, goodsid
export const fork_item = (token, barcode, prodname, teamuid, imageURL, goodsid) =>{
    console.log(`${config.API_URL}/api/items?barcode=${barcode}&prodname=${prodname}&imageURL=${imageURL}&goodsid=${goodsid}`);
    return axios.post(`${config.API_URL}/api/items/fork?barcode=${barcode}&prodname=${prodname}&imageURL=${imageURL}&goodsid=${goodsid}`,{},{
        headers:{
            token: token,
            teamuid: teamuid
        }}
    );
}
/************************
 ****** DEADLINE ********
 ************************/

// POST /api/deadline?teamuid={teamuid}&goodsid={goodsid}&expdate={expdate}&barcode={barcode}&prodname={prodname}&imageURL={imageURL}
// 유통기한 생성
// headers: token, teamuid
// params: goodsid, expdate, barcode, prodname, imageURL
export const set_deadline = (token, teamuid, goodsid, expdate, barcode, prodname, imageURL) =>{
    console.log(token, teamuid, goodsid, expdate, barcode, prodname, imageURL);
    return axios.post(`${config.API_URL}/api/deadline?goodsid=${goodsid}&expdate=${expdate}&barcode=${barcode}&prodname=${prodname}&imageURL=${imageURL}`,{},{
        headers:{
            token: token,
            teamuid: teamuid
        }}
    );
}

// GET /api/deadline?
// 등록한 유통기한 불러오기
// headers: token, teamuid

export const get_deadline = (token, teamuid) =>{
    return axios.get(`${config.API_URL}/api/deadline`,{
        headers:{
            token: token,
            teamuid: teamuid
        }}
    );
}