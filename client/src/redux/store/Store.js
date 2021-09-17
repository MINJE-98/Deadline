import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index'

// persist 설정합니다.
const persistConfig ={
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['AuthReducer', 'TeamReducer'],
    backlist: ['TeamInfoReducer', 'ItemsReducer', 'DeadlineReducer']
}

// persistRducer 생성합니다.
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 스토어 생성합니다.
export const store = createStore(persistedReducer, applyMiddleware(thunk));
// persist 스토어 생성합니다.
export const persistor = persistStore(store);
