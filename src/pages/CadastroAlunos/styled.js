import styled from "styled-components";
import * as colors from '../../config/colors'

export const Title = styled.h1`
    align-items: center;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    label{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    input {
        height: 40px;
        font-size: 18px;
        border: 1px solid #ddd;
        padding: 0 10px;
        border-radius: 4px;

        &:focus{
            border: 1px solid ${colors.primaryColor};
        }
    }
`

export const ProfilePicture = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 20px;
    position: relative;

    img{
        width: 180px;
        height: 180px;
        border-radius: 50%;
    }

    a{
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        position: absolute;
        bottom: 0;
        color: #fff;
        background: ${colors.primaryDarkColor};
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }
`