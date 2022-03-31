import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { useEffect, useState, useContext } from "react";
import axios from "axios";



import Header from "./Header"
import Footer from "./Footer";
import IfosLoginContext from "./InfosLoginContext";


export default function HabitsScreen() {
    const { infosLogin } = useContext(IfosLoginContext);

    const [userHabitsList, setUserHabitsList] = useState({ data: [] })
    const [isCreateHabitClicked, setIsCreateHabitClicked] = useState(false);
    console.log(
        userHabitsList
    )

    function toggleCreateHabit() {
        isCreateHabitClicked ? setIsCreateHabitClicked(false) : setIsCreateHabitClicked(true);
    }

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${infosLogin.token}`
            }
        }
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        request.then(response => {
            const { data } = response;
            setUserHabitsList({ ...userHabitsList, data })
        })
        request.catch(response => alert(response))
    }, [])

    return (
        <>
            <Header picture={infosLogin.image} />
            <Main>
                <nav>
                    <h2>Meus Hábito</h2>
                    <button onClick={() => { toggleCreateHabit() }}> + </button>
                </nav>
                {isCreateHabitClicked ? <CreateHabit toggleCreateHabit={toggleCreateHabit} setUserHabitsList={setUserHabitsList} userHabitsList={userHabitsList} /> : ""}
                {userHabitsList.data.length === 0 ? <p> Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear! </p> : JSON.stringify(userHabitsList)}
            </Main>
            <Footer />
        </>
    )
}


function CreateHabit(props) {
    const { infosLogin } = useContext(IfosLoginContext);

    const { toggleCreateHabit, setUserHabitsList, userHabitsList } = props;
    const [infosToCreateAHabit, setInfosToCreateAHabit] = useState({
        name: "",
        days: []
    })

    function setDays(value) {
        let aux = []
        infosToCreateAHabit.days.includes(value) ?
            aux = infosToCreateAHabit.days.filter((eachvalue) => { return (eachvalue !== value) }) :
            aux = [...infosToCreateAHabit.days, value];
        aux = aux.sort()
        setInfosToCreateAHabit({ ...infosToCreateAHabit, days: [...aux] })
    }

    function PostANewHabit(e) {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${infosLogin.token}`
            }
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", infosToCreateAHabit, config)
        request.then(response => { setUserHabitsList({...userHabitsList, data: [...userHabitsList.data, response.data]}); toggleCreateHabit() })
        request.catch(response => alert("Algo deu errado" + response))
    }

    return (
        <div>
            <form onSubmit={PostANewHabit} >
                <input type="text" placeholder="nome do hábito" value={infosToCreateAHabit.name} onChange={e => { setInfosToCreateAHabit({ ...infosToCreateAHabit, name: e.target.value }) }} />
                <div>
                    <input type="button" value="D" name="0" onClick={e => { setDays(e.target.name) }} />
                    <input type="button" value="S" name="1" onClick={e => { setDays(e.target.name) }} />
                    <input type="button" value="T" name="2" onClick={e => { setDays(e.target.name) }} />
                    <input type="button" value="Q" name="3" onClick={e => { setDays(e.target.name) }} />
                    <input type="button" value="Q" name="4" onClick={e => { setDays(e.target.name) }} />
                    <input type="button" value="S" name="5" onClick={e => { setDays(e.target.name) }} />
                    <input type="button" value="S" name="6" onClick={e => { setDays(e.target.name) }} />
                </div>
                <button type="reset">Cacelar</button> <button type="submit">Salvar</button>
            </form>
        </div>
    )
}

const Main = styled.main`
    width: 100vw;
    padding: 70px 0px;
    min-height: 100vh;
    background-color: #F2F2F2;

    nav {
        width: 100%;
        padding: 20px 18px;
        display: flexbox;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;

        h2{
            font-size: 22.976px;
            color: #126BA5;
        }
        button{
            width: 40px;
            height: 35px;
            background-color: #52B6FF;
            color: #FFFFFF;
            border-radius: 4.63636px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26.976px;
            border: none;
            cursor: pointer;
        }
    }
`