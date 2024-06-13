import React from "react";
import { Title, Form } from "./styled";
import { useState } from "react";
import { Container } from "../../styles/GlobalStyle";
import { isEmail } from "validator";
import { toast } from "react-toastify";
import myAxios from '../../services/axios'
import * as actions from '../../store/modules/auth/actions'
import { useDispatch } from "react-redux";
import { get } from "lodash";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";


export default function Login(props){
    const carregando = useSelector(state => state.auth.isLoading)
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const dispatch = useDispatch()
    const prevPath = get(props, 'location.state.prevPath', '/')
    function handleSubmit(e){
        e.preventDefault();
        let formErrors = false

        if(password.length < 6 || password.length > 50){
            toast.error('senha inválida')
            formErrors = true
        }

        if(!isEmail(email)){
            toast.error('email inválido')
            formErrors = true
        }

        if(formErrors) return

        dispatch(actions.loginRequest({email,password,prevPath}))        

    }
    return (
        <Container>
            <Loading isLoading={carregando}/>
            <Title>
                Login          
            </Title>

            <Form onSubmit={handleSubmit}>
                <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu email"
            />

            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="sua senha"
            />

            <button type="submit">logar</button>
            </Form>
        </Container>
    )
}