import React, { useState } from "react";
import { Title } from "./styled";
import { Container } from "../../styles/GlobalStyle";
import { AlunoContainer, ProfilePicture, novoAluno } from "./styled";
import { get } from 'lodash'
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from "react-icons/fa";
import { Link } from "react-router-dom"
import myAxios from '../../services/axios';
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

export default function ListaAlunos(){
    const[aluno , setAluno] = useState([])
    const[carregando, setCarregando] = useState(false)
   React.useEffect(()=>{
    async function getData(){
        setCarregando(true)
        const response = await myAxios.get('/alunos')
        setCarregando(false)
        const alunos = response.data
        setAluno(alunos)
    }

    getData()
   } , [])

    function handleDeleteAsk(e){
    e.preventDefault()
    const del = e.currentTarget.nextSibling
    del.setAttribute('display', 'block')
    e.currentTarget.remove()
   }

   async function handleDelete(e,id,index){
    e.persist()
    try{
        await myAxios.delete(`/alunos/${id}`)
        const novosAlunos=[...aluno]
        novosAlunos.splice(index,1)
        console.log(id)
        setAluno(novosAlunos)
    } catch (e){
        const status = get(e, 'response.status', 0)
        if(status===401){
            toast.error('é preciso fazer login')
        }
        else{
            toast.error('erro ao excluir o aluno')
        }
    }
   }
    return (
        <Container>
            <Loading isLoading={carregando}/>
            <Title>
                <h1>Alunos</h1>
            </Title>
            <a href='/aluno'>Novo aluno</a>
            <AlunoContainer>
                    {aluno.map((alunos,index) => (
                        
                        <div key={String(alunos.id)}>
                            
                            <ProfilePicture>
                            
                                {get(alunos , 'Fotos[0].filename' , false ) ? (
                                    <img crossOrigin="anonymous" src = {`http://192.168.3.125:8080/images/${alunos.Fotos[0].filename}`} alt=""></img>
                                ) : (
                                    <FaUserCircle size={36}/>
                                )}
                            
                            </ProfilePicture>
                            <span>{alunos.nome}</span>
                            <span>{alunos.email}</span>

                            <Link to={`/aluno/${alunos.id}/edit`} ><FaEdit size={16}/></Link>
                            <Link to={`/aluno/${alunos.id}/delete`} onClick={handleDeleteAsk}><FaWindowClose size={16}/></Link>
                            <FaExclamation size={16} display="none" cursor="pointer" onClick={(e)=>handleDelete(e,alunos.id, index)}/>
                        </div>
                    ))}
                </AlunoContainer>
        </Container>
    )
}

//o display none do Exclamation impede que o botão seja renderizado no momento.O nosso objetivo é que quando clicarmos no nosso botão de excluir,ele mude para a exclamação
//A função que ficará reponsável por isto será a função 'handleDeleteAsk',criada no nosso botão de 'FaWindowClose'