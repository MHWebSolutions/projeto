import { createStore, applyMiddleware } from "redux";
import persistedReducers from './modules/reduxPersist'
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSagas";
import createSagaMiddleware from 'redux-saga'
import { persistStore } from "redux-persist"; 

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    persistedReducers(rootReducer),
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)
export default store;