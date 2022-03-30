import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";


import logo from '../assets/logo.png';
import axios from 'axios';

export default function LogInScreen() {
    const navigate = useNavigate();
    const [isUnavailable, setIsUnavaiable] = useState(false)
    const [logInData, setLogInData] = useState({
        email: "",
        password: "",
    })

    function postInputs(e) {
        e.preventDefault();
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", logInData);
        request.then(() => navigate("/habitos"))
        request.catch((response) => alert(
        `Algo deu errado, por favor recarregue a página e tente novamente!
       
        Erro: ${response}`
        ))

        setIsUnavaiable(true)
    }
    return (
        <Main>
            <img src={logo} alt="Logo" />
            <form onSubmit={postInputs}>
                <input disabled={isUnavailable} type="email" placeholder='email' name="email" value={logInData.email} onChange={e => { setLogInData({ ...logInData, email: e.target.value }) }} />
                <input disabled={isUnavailable} type="password" placeholder='senha' name="password" value={logInData.password} onChange={e => { setLogInData({ ...logInData, password: e.target.value }) }} />
                <button disabled={isUnavailable} type='submit'> Entrar </button>
            </form>
            <Link to="/cadastro">
                Não tem conta? Cadastre-se!
            </Link>
        </Main>
    )
}


// Estilos
const Main = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    img{
        width: 180px;
    }
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    button{
        cursor: pointer;
    }

    a{
        cursor: pointer;
    }

    input:disabled{
        color: #ccc
    }
`