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
    const { setLoadingState } = useContext(LoadingContext)
    const [loadBarState, setLoadBarState] = useState(0)


    const [listOfTodayHabits, setListOfTodayHabits] = useState([])
    const [effectHabits, setEffectHabits] = useState(["something"])
    const dayjs = require('dayjs')

    const config = {
        headers: {
            Authorization: `Bearer ${infosLogin.token}`
        }
    }
    useEffect(() => {
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        request.then(response => { setListOfTodayHabits(response.data); computePercent(response.data) })
        request.catch(response => { alert(response) })

    }, effectHabits)


    function computePercent(array) {
        const totalHabits = array.length;
        let concluedHabits = 0;

        for (let each of array) {
            if (each.done === true)
                concluedHabits += 1;
        }

        const percent = parseInt((concluedHabits / totalHabits) * 100);
        setLoadBarState(percent)
    }

    return (
        <>
            <Header picture={infosLogin.image} />
            <Main>
                <div>
                    <h2> {weekDays[dayjs().$W]}, {("00" + (dayjs().$D)).slice(-2)}/{("00" + (dayjs().$M + 1)).slice(-2)} </h2>
                    <StatusProgresso loadBarState={loadBarState} >{loadBarState === 0 ? "Nenhum hábito concluído ainda" : loadBarState + "% dos hábitos concluídos"}</StatusProgresso>
                    <section>
                        {listOfTodayHabits.length === 0 ? "" : <Habits config={config} setEffectHabits={setEffectHabits} listOfTodayHabits={listOfTodayHabits} />}
                    </section>
                </div>
            </Main>
            <Footer />
        </>
    )
}

function Habits(props) {
    const { setLoadingState } = useContext(LoadingContext)
    const { listOfTodayHabits, setEffectHabits, config } = props;
    const [isUnavailable, setIsUnavaiable] = useState(false)

    return (
        listOfTodayHabits.map((eachHabit) => {

            return (
                <BoxCheckMark key={eachHabit.id}>
                    <div>
                        <h3>{eachHabit.name}</h3>
                        <p> Sequencia atual: <Sequence sequence={eachHabit.currentSequence}> {eachHabit.currentSequence} dias</Sequence></p>
                        <p> Seu recorde: <Record sequence={eachHabit.currentSequence} record={eachHabit.highestSequence}> {eachHabit.highestSequence} dias </Record> </p>
                    </div>
                    <Button
                        disabled={isUnavailable}
                        isdone={eachHabit.done}
                        onClick={() => { PostCheckMark(eachHabit, setEffectHabits, config, setLoadingState, setIsUnavaiable); setIsUnavaiable(true) }}>
                        <ion-icon name="checkmark-outline"></ion-icon>
                    </Button>
                </BoxCheckMark>
            )
        })
    )
}

function PostCheckMark(objectHabit, setEffectHabits, config, setLoadingState, setIsUnavaiable) {

    const id = objectHabit.id
    let booleanCheck = objectHabit.done ? "uncheck" : "check";
    const arr = new Array(booleanCheck + id);

    let request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${booleanCheck}`, {}, config);
    request.then(() => { setEffectHabits(arr); setLoadingState(["Atualizar"]); setIsUnavaiable(false) })
    request.catch((response) => { alert("Algo deu errado! Erro: " + response) })
}








const Main = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 70px 0px 120px 0px;
    background-color: #F2F2F2;

    h2{
        font-size: 22.976px;
        color: #126BA5;
        line-height: 29px;
    }

    & > div{
        margin: 20px auto 0 auto;
        width: 90%;
    }
    section{
        width: 100%;
        padding-top: 30px;
    }

`

const StatusProgresso = styled.p`
    padding: 5px 0px;
    color: ${(props) => {
        return (props.loadBarState === 0 ? "#BABABA" : "#8FC549")
    }};
`

const BoxCheckMark = styled.div`
    width: 100%;
    background-color: white;
    margin: 10px 0;
    padding: 13px;
    display: grid;
    grid-template-columns: auto 70px;
    justify-content: space-between;
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

const Sequence = styled.span`
    color: ${props => props.sequence > 0 ? "#8FC549" : "#666666"};
`

const Record = styled.span`
    color: ${props => (props.sequence >= props.record && props.record > 0) ? "#8FC549" : "#666666"};
`