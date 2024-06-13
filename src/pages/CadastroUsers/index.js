import React, {useState} from "react";
import { Title, Form } from "./styled";
import { Container } from "../../styles/GlobalStyle";
import { toast } from "react-toastify";
import myAxios from '../../services/axios'
import { isEmail } from "validator";
import { get } from "lodash";
import history from "../../services/history";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/modules/auth/actions'

export default function CadastroUsers(){
    const id = useSelector(state => state.auth.user.id)
    const nome_user = useSelector(state => state.auth.user.nome)
    const email_user = useSelector(state=>state.auth.user.email)
    const carregando = useSelector(state=>state.auth.isLoading)
    const[email,setEmail] = useState('')
    const[nome, setNome] = useState('')
    const[password,setPassword] = useState('')
    const dispatch = useDispatch()

    async function handleSubmit(e){
        e.preventDefault();
        let formErrors = false;

        if(nome.length < 3 || nome.length> 255){
            formErrors = true
            toast.error('nome deve ter entre 3 e 255 caracteres')
        }

        if(!isEmail(email)){
            formErrors = true
            toast.error('email inválido')
        }

        if(password.length < 6 || password.length > 50){
            formErrors = true
            toast.error('senha deve ter entre 6 e 50 caracteres')
        }

        if(formErrors){
            return
        }
        
        dispatch(actions.cadastroRequest({id,nome,email,password}))
       
    }

    React.useEffect(()=>{
        if(id){
            setNome(nome_user)
            setEmail(email_user)
        }
    },[])
    return (
        <Container>
            <Loading isLoading={carregando}/>
            <Title>
                 <h1>{id? "Edite seus dados": "crie sua conta"}</h1>         
            </Title>
           <Form onSubmit={handleSubmit}>
            <label htmlFor="nome">
                nome:
                <input 
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="seu nome"
                />
            </label>

            <label htmlFor="email">
                email:
                <input 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu email"
                />
            </label>

            <label htmlFor="password">
                senha:
                <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="sua senha"
                />
            </label>

            <button type="submit">{id? "editar": "criar conta"}</button>
           </Form>
        </Container>
    )
}