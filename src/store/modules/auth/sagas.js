import { call, put, all, takeLatest} from "redux-saga/effects";
import * as actions from './actions'
import * as types from '../types'
import myAxios from '../../../services/axios'
import { toast } from "react-toastify";
import history from "../../../services/history";
import { get } from "lodash";
import { useSelector } from "react-redux";


function* loginRequest({payload}){
   try{
      const response = yield call(myAxios.post, '/Token', payload)
      yield put(actions.loginSuccess({...response.data}))
      toast.success('usuário logado com sucesso')
      myAxios.defaults.headers.authorized = `Bearer ${response.data.token}`
      history.push(payload.prevPath)

   } catch(e){ 
        toast.error('usuário ou senha incorretos')
        yield put(actions.loginFailure())
    }
}

function* cadastroRequest({payload}){
    try{
        const dados = {nome :payload.nome, email:payload.email, password:payload.password}
        if(payload.id){
            const response = yield call(myAxios.put, `/users/`,payload)
            yield put(actions.editSucess({...response.data}))
            console.log(response.data)
            toast.success("usuário editado com sucesso,faça login novamente")
            history.push('/login')
        }

        else{
            const response = yield call(myAxios.post, '/users/', dados)
            yield put(actions.cadastroSucess())
            toast.success('cadastro bem-sucedido')
            history.push('/login')
        }
    } catch(e){
        yield put(actions.cadastroFailure())
        const status = get(e, 'response.status' , 0)
        const errors = get(e, 'response.data.errors' , 0)
        errors.map( error => toast.error(error))
    }
}

function persistRehydrate({payload}){
    const token = get(payload, 'auth.token', '')
    if(!token) return

    myAxios.defaults.headers.authorized = `$Bearer ${token}`
}
export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.persist_REHYDRATE, persistRehydrate),
    takeLatest(types.CADASTRO_REQUEST, cadastroRequest)
])