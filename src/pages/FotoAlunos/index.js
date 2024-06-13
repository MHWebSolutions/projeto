import React , {useState} from "react";
import { Title, Form } from "./styled";
import { Container } from "../../styles/GlobalStyle";
import Loading from "../../components/Loading";
import myAxios from '../../services/axios'
import history from '../../services/history'
import { get } from "lodash";
import { toast } from "react-toastify";
import PropTypes from 'prop-types'

export default function FotosAlunos({match}){
    const[carregando,setCarregando] = useState(false)
    const[foto,setFoto] = useState('')
    const[link, setLink] = useState('')
    const id = get(match , 'params.id' , '')

    React.useEffect(()=>{
        async function getData(){
            try{
                setCarregando(true)
                const {data} = await myAxios.get(`alunos/${id}`)
                const link = get(data , 'Fotos[0].filename', '')
                const url = `http://192.168.3.125:8080/images/${link}`
                setLink(link)
                setFoto(url)
                setCarregando(false)
            } catch(e){
                setCarregando(false)
                toast.error('erro inesperado')
                history.push('/')
            }
        }

        getData()
    },[])

    async function handleChange(e){
        const file = e.target.files[0]
        const fotoURL = URL.createObjectURL(file)
        setFoto(fotoURL)

        const formData = new FormData()
        formData.append('aluno_id' , id)
        formData.append('foto', file)

        try{
            setCarregando(true)
            const {data} = await myAxios.post('/fotos/' , formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            setCarregando(false)
            toast.success('foto editada com sucesso')
            history.push('/')
        } catch(e){
            setCarregando(false)
            toast.error('erro inesperado,verifique o tipo de arquivo ou se o aluno existe')
        }
    }

    return (
        <Container>
            <Loading isLoading={carregando}/>
            <Title >
                Fotos         
            </Title>
            <Form>
                <label htmlFor="foto">
                    { link ? (
                        <img crossOrigin="anonymous" src={foto} alt="Foto"/>
                    ) : ("selecionar imagem")}
                    <input type="file" name="foto" id="foto" onChange={handleChange}/>
                </label>
            </Form>
        </Container>
    )
}

FotosAlunos.propTypes={
    match: PropTypes.shape({}).isRequired,
}