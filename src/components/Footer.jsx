import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";


import InfosLoginContext from "./InfosLoginContext";
import LoadingContext from "./LoadingContext";
import Circle from "./Circle"

export default function Footer(props) {

    const { infosLogin } = useContext(InfosLoginContext);
    const {loadingState} = useContext(LoadingContext)
    const [loadBarState, setLoadBarState] = useState(0)
    console.log(loadBarState)

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${infosLogin.token}` }
        }
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        request.then(response => {
            computePercent(response.data)
        })
        request.catch(response => alert(response))
    }, [loadingState])

    function computePercent(array){
        const totalHabits = array.length;
        let concluedHabits = 0;

        for(let each of array){
            if(each.done === true)
            concluedHabits += 1;
        }

        const percent = parseInt((concluedHabits/totalHabits)*100);
        setLoadBarState(percent)
    }

    const { picture } = props
    const navigate = useNavigate();

    return (
        <StyledHead>
            <Link to={"/habitos"}>Hábitos</Link>

            <button onClick={() => { navigate("/hoje") }}> <Circle loadBarState={loadBarState} /> </button>
            <Link to={"/historico"}>Histórico</Link>
        </StyledHead>
    )
}

const StyledHead = styled.nav`
    width: 100vw;
    height: 70px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    color: #52B6FF;
    padding: 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 17.976px;

    position: fixed;
    left: 0px;
    bottom: 0px;

    button{
        position: absolute;
        left: calc(50% - 45px);
        top: -30px;
        background-color: #52B6FF;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
    }

    a{
        cursor: pointer;
        text-decoration: none;
        color: inherit;
    }
`