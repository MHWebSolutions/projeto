import React from "react";
import { Title, Form, ProfilePicture } from "./styled";
import { Container } from "../../styles/GlobalStyle";
import myAxios from '../../services/axios'
import { get, matches } from "lodash";
import PropTypes from 'prop-types'
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import history from "../../services/history";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function CadastroAlunos({match}){
  const id = get(match, 'params.id', '')
  const[nome, setNome]= useState('')
  const[sobrenome, setSobrenome]= useState('')
  const[email,setEmail] = useState('')
  const[idade,setIdade] = useState('')
  const[peso, setPeso] = useState('')
  const[altura, setAltura] = useState('')
  const[carregando, setCarregando] = useState(false)
  const[Foto, setFoto] = useState('')
  const[nomeFoto, setNomeFoto] = useState('')
  
  React.useEffect(()=>{
    if(!id) return
    async function getData(){
       try{
        setCarregando(true)
        const {data} = await myAxios.get(`alunos/${id}`)
        const link = get(data, 'Fotos[0].filename', '')
        setFoto(`http://192.168.3.125:8080/images/${link}`)
        setNomeFoto(link)
        setNome(data.nome)
        setSobrenome(data.sobrenome)
        setEmail(data.email)
        setIdade(data.idade)
        setPeso(data.peso)
        setAltura(data.altura)
        setCarregando(false)
       } catch(e){
        toast.error('erro inesperado')
        setCarregando(false)
        history.push('/')
       }
    }

    getData()
  },[id])


  async function handleSubmit(e){
    let formErrors = false
    e.preventDefault()
    if(nome.length< 3 || nome.length > 255){
        toast.warning('nome precisa ter entre 3 a 255 caracteres')
        formErrors = true
    }
    if(sobrenome.length< 3 || sobrenome.length > 255){
        toast.warning('sobrenome precisa ter entre 3 a 255 caracteres')
        formErrors = true
    }
    if(!isEmail(email)){
        toast.warning("Email inválido")
        formErrors = true
    }
    if(!idade || !peso || !altura){
        toast.warning('Nenhum campo pode estar vazio')
        formErrors = true
    }

    if(formErrors){
        return
    }

    if( id ){
        try{
            setCarregando(true)
            const response = await myAxios.put(`/alunos/${id}`, {nome,sobrenome,email,idade,peso,altura})
            toast.success('aluno editado com sucesso')
            setCarregando(false)
            history.push('/')
        } catch(e){
            toast.error('ocorreu um erro inesperado,verifique se você está logado ou se este aluno existe no sistema')
        }
    }
    try{
        setCarregando(true)
        const response = await myAxios.post('/alunos', {nome,sobrenome,email,idade,peso,altura})
        setCarregando(false)
        toast.success('aluno cadastrado com sucesso')
        history.push('/')
    } catch(e){
        toast.error('ocorreu um erro inesperado,verifique se você está logado corretamente')
        setCarregando(false)
    }
    
  }
   
  
    return (
        <Container>
            <Loading isLoading={carregando}/>
            <Title>
                <h1>{id ? 'Editar aluno': 'cadastrar aluno'}</h1>          
            </Title>
            {id &&(
               nomeFoto?(
                <ProfilePicture>
                    <img crossOrigin='anonymous'src={Foto} alt=""/>
                    <Link to = {`/fotos/${id}`}>
                        <FaEdit size={24}/>
                    </Link>
                </ProfilePicture>
               ):(
                <ProfilePicture>
                    <FaUserCircle size={180}/>
                    <Link to = {`/fotos/${id}`}>
                        <FaEdit size={24}/>
                    </Link>
                </ProfilePicture>
               )

            )}

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

            <label htmlFor="sobrenome">
                sobrenome:
                <input 
                type="text"
                value={sobrenome}
                onChange={e => setSobrenome(e.target.value)}
                placeholder="seu sobrenome"
                />
            </label>

            <label htmlFor="email">
                email:
                <input 
                type="textS"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu email"
                />
            </label>

            <label htmlFor="idade">
                idade:
                <input 
                type="number"
                value={idade}
                onChange={e => setIdade(e.target.value)}
                placeholder="sua idade"
                />
            </label>

            <label htmlFor="peso">
                peso:
                <input 
                type="number"
                value={peso}
                onChange={e => setPeso(e.target.value)}
                placeholder="seu peso"
                />
            </label>

            <label htmlFor="altura">
                altura:
                <input 
                type="number"
                value={altura}
                onChange={e => setAltura(e.target.value)}
                placeholder="sua altura"
                />
            </label>

            <button type="submit">{id? 'editar aluno' : 'cadastrar aluno'}</button>
            </Form>
           
        </Container>
    )
}