import styled from 'styled-components';
import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


import logo from '../assets/logo.png'
import LoadingButton from './LoadingButton';


export default function SignUpScreen() {

    const navigate = useNavigate();
    const [isUnavailable, setIsUnavaiable] = useState(false)
    const [signUpData, setSignUpData] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    })


    function postInputs(e) {
        e.preventDefault();
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", signUpData)

        request.then(() => navigate("/"))
        request.catch(
            (response) => {
                alert(`Alguma coisa deu errado, por favor recarregue a página e tente novamente! 
        
                Erro: ${response}`);
                window.location.reload();
            })
        setIsUnavaiable(true)
    }

    return (
        <Main>
            <img src={logo} alt="Logo" />
            <form onSubmit={postInputs}>
                <input disabled={isUnavailable} type="email" placeholder=' email' name="email" value={signUpData.email} onChange={e => { setSignUpData({ ...signUpData, email: e.target.value }) }} />
                <input disabled={isUnavailable} type="password" placeholder=' senha' name="password" value={signUpData.password} onChange={e => { setSignUpData({ ...signUpData, password: e.target.value }) }} />
                <input disabled={isUnavailable} type="text" placeholder=' nome' name="name" value={signUpData.name} onChange={e => { setSignUpData({ ...signUpData, name: e.target.value }) }} />
                <input disabled={isUnavailable} type="text" placeholder=' foto' name="image" value={signUpData.image} onChange={e => { setSignUpData({ ...signUpData, image: e.target.value }) }} />
                <button disabled={isUnavailable} type='submit'> {isUnavailable ? <LoadingButton /> : "Eviar"} </button>
            </form>
            <Link to={"/"}> Já tem uma conta? Faça login! </Link>
        </Main>
    )
}




// Estilos
const Main = styled.main`
    width: 100vw;
    height: 100vh;
    padding-bottom: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
        width: 180px;
    }
    form{
        width: 88%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 30px auto;
        input{
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            box-sizing: border-box;
            border-radius: 5px;
            width: 100%;
            height: 45px;
            margin-bottom: 6px;
            color: #666666;
            
            &::placeholder{
                color: #D5D5D5;
                font-size: 20px;
            }
        }
    }

    button{
        cursor: pointer;
        border: none;
        width: 100%;
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        color: #FFFFFF;
        font-size: 20.976px;
    }

    a{
        cursor: pointer;
        color: #52B6FF;
    }

    input:disabled{
        color: #ccc
    }
`