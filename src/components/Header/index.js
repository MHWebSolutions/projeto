import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt, FaPowerOff, FaCircle} from 'react-icons/fa'
import { Nav } from "./styled";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/modules/auth/actions'

export default function Header(){
    const dispatch = useDispatch()
    const login = useSelector(state => state.auth.login)

    function handleClick(e){
        e.preventDefault()
        dispatch(actions.loginFailure())
    }
    return <Nav>
        <Link to='/'>
            <FaHome/>
        </Link>
        <Link to='/register'>
            <FaUserAlt/>
        </Link>
        
        {login ? (
            <Link>
                <FaPowerOff onClick={handleClick}/>
            </Link>
        ) : (
            <Link to='/login'>
                <FaSignInAlt/>
            </Link>
        )}

        {login && <FaCircle color="#14cc21"/>}

    </Nav>
}