import * as types from '../types'
import { useState } from 'react'
import myAxios from '../../../services/axios'

const initialState = {
    login: false,
    token: false,
    user:{},
    isLoading: false
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action ){
    
    switch(action.type){
        case types.LOGIN_SUCESS:{
            const newState = {...state}
            newState.login = true
            newState.token = action.payload.token
            newState.user = action.payload.user
            newState.isLoading = false
            return newState
        }
        case types.LOGIN_FAILURE:{
            const newState = {...initialState}
            newState.isLoading = false;
            delete myAxios.defaults.headers.authorized
            return newState
        }

        case types.LOGIN_REQUEST:{
            const newState = {...initialState}
            newState.isLoading = true
            return newState
        }

        case types.CADASTRO_REQUEST:{
            const newState = {...initialState}
            newState.isLoading = true
            return newState
        }

        case types.CADASTRO_SUCESS:{
            const newState = {...initialState}
            newState.isLoading = false
            return newState
        }

        case types.CADASTRO_FAILURE:{
            const newState = {...initialState}
            newState.isLoading = false
            return newState
        }

        case types.EDIT_SUCESS:{
            const newState = {...initialState}
            newState.user.id = action.payload.id
            newState.user.nome = action.payload.nome
            newState.user.email = action.payload.email
            newState.isLoading = false
            return newState
        }
        default:
            return state
    }
}
