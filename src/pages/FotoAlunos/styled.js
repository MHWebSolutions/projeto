import styled from "styled-components";
import * as colors from '../../config/colors'

export const Title = styled.h1`
    color: ${props => props.isRed ? 'red': 'blue'};
    p {
        color: red;
    }
`

export const Form = styled.form`
    input{
        display: none;
    }

    label{
        display: flex;
        width: 180px;
        height: 180px;
        background: #eee;
        border: 5px dashed ${colors.primaryColor};
        margin: 30px auto;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        img{
        width: 180px;
        height: 180px;
    }
    }
`