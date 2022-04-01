import 'dayjs';
import styled from 'styled-components';
import { useEffect, useState, useContext } from "react";


import InfosLoginContext from './InfosLoginContext';
import LoadingContext from './LoadingContext';
import Header from "./Header"
import Footer from './Footer';
import axios from 'axios';

export default function TodayScreen() {
    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const { infosLogin } = useContext(InfosLoginContext);
    const [listOfTodayHabits, setListOfTodayHabits] = useState([])
    const [effectHabits, setEffectHabits] = useState([true])
    const dayjs = require('dayjs')

    const config = {
        headers: {
            Authorization: `Bearer ${infosLogin.token}`
        }
    }
    useEffect(() => {
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        request.then(response => { setListOfTodayHabits(response.data) })
        request.catch(response => { alert(response) })
        
    }, effectHabits)

    return (
        <>
            <Header picture={infosLogin.image} />
            <Main>
                <h2> {weekDays[dayjs().$W]}, {("00" + (dayjs().$D)).slice(-2)}/{("00" + (dayjs().$M + 1)).slice(-2)} </h2>
                <p>Nenhum hábito concluido ainda</p>
                <section>
                    {listOfTodayHabits.length === 0 ? "" : <Habits config={config} setEffectHabits={setEffectHabits} listOfTodayHabits={listOfTodayHabits} />}
                </section>
            </Main>
            <Footer />
        </>
    )
}

function Habits(props) {
    const {setLoadingState} = useContext(LoadingContext)
    const { listOfTodayHabits, setEffectHabits, config } = props;
    return (
        listOfTodayHabits.map((eachHabit) => {
            return (
                <BoxCheckMark key={eachHabit.id}>
                    <div>
                        <h3>{eachHabit.name}</h3>
                        <p> Sequencia atual: <span>{eachHabit.currentSequence}</span>  dias</p>
                        <p> Seu recorde: <span> {eachHabit.highestSequence} </span> dias</p>
                    </div>
                    <Button isdone={eachHabit.done} onClick={() => { PostCheckMark(eachHabit, setEffectHabits, config, setLoadingState);  }}><ion-icon name="checkmark-outline"></ion-icon></Button>
                </BoxCheckMark>
            )
        })
    )
}

function PostCheckMark(objectHabit, setEffectHabits, config, setLoadingState) {
    const id = objectHabit.id
    let boobleanCheck = objectHabit.done ? "uncheck" : "check";
    
    let request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${boobleanCheck}`, {}, config);
    request.then(() => {setEffectHabits([id]); setLoadingState(["Atualizar"])})
}


const Main = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 70px 0px 120px 0px;
    background-color: #F2F2F2;
`

const BoxCheckMark = styled.div`
    width: 90%;
    margin: 10px auto;
    padding: 13px;
    display: grid;
    grid-template-columns: auto 70px;
    background-color: #FFFFFF;
    border-radius: 5px;

    h3{
        font-size: 20px;
        padding-bottom: 5px;
    }
    p{
        font-size: 13px;
    }

    

    ion-icon{
        font-size: 40px;
        --ionicon-stroke-width: 80px;
        color: #FFFFFF;
    }

`

const Button = styled.button`
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.isdone ? "#8FC549" : "#E7E7E7"};
    cursor: pointer;
`