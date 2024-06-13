import styled from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h1`
    color: ${props => props.isRed ? 'red': 'blue'};
    p {
        color: red;
    }
`

export const AlunoContainer = styled.div`
    margin-top: 20px;
    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
    }

    div + div {
        border-top: 1px solid #eee;
    }
`

export const ProfilePicture = styled.div`
    img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }
`

export const novoAluno = styled(Link)`
    display: block;
    padding: 10px;
`