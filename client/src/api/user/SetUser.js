import api, { handleError } from '@/api'

// 유저 정보를 저장합니다.
// POST /api/auth
// headers: token
// params: null
export const setUser = async( token ) =>{
    return api.post(`/api/auth`,{},{
        headers:{
            token: token
        }
    });
}