import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";


// eslint-disable-next-line import/no-anonymous-default-export
export default reducers =>{
    const persistedReducers = persistReducer({
        key: 'SISTEMA_ESCOLAR',////aqui colocamos o nome que a nossa aplicação levará
        storage,
        whitelist:['auth'],
    }, reducers)

    return persistedReducers
}