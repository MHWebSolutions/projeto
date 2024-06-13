import {  LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAILURE, CADASTRO_REQUEST, CADASTRO_SUCESS, CADASTRO_FAILURE, EDIT_SUCESS } from "../types"

export function loginRequest(payload){
    return{
        type: LOGIN_REQUEST,
        payload
    }
}

export function loginSuccess(payload){
    return{
        type: LOGIN_SUCESS,
        payload
    }
}

export function loginFailure(payload){
    return{
        type: LOGIN_FAILURE,
        payload
    }
}

export function cadastroRequest(payload){
    return{
        type: CADASTRO_REQUEST,
        payload
    }
}

export function cadastroSucess(){
    return{
        type: CADASTRO_SUCESS
    }
}

export function editSucess(payload){
    return{
        type: EDIT_SUCESS,
        payload
    }
}

export function cadastroFailure(){
    return{
        type: CADASTRO_FAILURE
    }
}