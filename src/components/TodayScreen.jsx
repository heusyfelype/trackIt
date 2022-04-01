import 'dayjs';
import styled from 'styled-components';
import { useEffect, useState, useContext } from "react";


import InfosLoginContext from './InfosLoginContext';
import Header from "./Header"
import Footer from './Footer';
import axios from 'axios';

export default function TodayScreen() {
    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const { infosLogin } = useContext(InfosLoginContext);
    const [listOfTodayHabits, setListOfTodayHabits] = useState([])

    const dayjs = require('dayjs')
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${infosLogin.token}`
            }
        }
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        request.then(response => { setListOfTodayHabits(response.data) })
        request.catch(response => { alert(response) })

    }, [])

    return (
        <>
            <Header />
            <Main>
                <h2> {weekDays[dayjs().$W]}, {dayjs().$D}/{("00" + (dayjs().$M + 1)).slice(-2)} </h2>
                <p>Nenhum hábito concluido ainda</p>
                <section>
                    {listOfTodayHabits.length === 0 ? "" : <Habits listOfTodayHabits={listOfTodayHabits} setListOfTodayHabits={setListOfTodayHabits} />}
                </section>
            </Main>
            <Footer />
        </>
    )
}

function Habits(props) {

    const { listOfTodayHabits, setListOfTodayHabits } = props;
    console.log(listOfTodayHabits)
    return (
        listOfTodayHabits.map(eachHabit => {
            return (
                <BoxCheckMark key={eachHabit.id}>
                    <div>
                        <h3>{eachHabit.name}</h3>
                        <p> Sequencia atual: {eachHabit.currentSequence} dias</p>
                        <p> Seu recorde: {eachHabit.highestSequence} dias</p>
                    </div>
                    <button><ion-icon name="checkmark-outline"></ion-icon></button>
                </BoxCheckMark>
            )
        })
    )
}




const Main = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 70px 0px 120px 0px;
    background-color: #F2F2F2;
`

const BoxCheckMark = styled.div`
    width: 90%;
    margin: 0px auto;
    padding: 13px;
    display: grid;
    grid-template-columns: auto 70px;
    background-color: #FFFFFF;
    border-radius: 5px;

    button{
        height: 70px;
    }

`