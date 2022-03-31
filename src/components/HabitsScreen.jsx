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
                {userHabitsList.data.length === 0 ? <p> Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear! </p> : <ListHabits userHabitsList={userHabitsList} />}
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
    const [isCancelClicked, setIsCancelClicked] = useState(false)

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
        request.then(response => { setUserHabitsList({ ...userHabitsList, data: [...userHabitsList.data, response.data] }); toggleCreateHabit() })
        request.catch(response => alert("Algo deu errado" + response))
    }

    return isCancelClicked ? "" : (
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
                <button onClick={() => { setIsCancelClicked(true) }}>Cacelar</button> <button type="submit">Salvar</button>
            </form>
        </div>
    )
}


function ListHabits(props) {
    const { userHabitsList } = props;
    console.log(userHabitsList)

    return (
        userHabitsList.data.map((eachHabit) => {
            console.log(eachHabit, eachHabit.name, eachHabit.days)
            return (
                <BoxHabit key={JSON.stringify(eachHabit)}>
                    <div> <h2>{eachHabit.name}</h2> <span><ion-icon name="trash-outline"></ion-icon></span></div>
                    
                    <section>
                        <WeekDays value="D" name="0" atThisDay={eachHabit.days.includes(0)}> D </WeekDays>
                        <WeekDays value="S" name="1" atThisDay={eachHabit.days.includes(1)}> S </WeekDays>
                        <WeekDays value="T" name="2" atThisDay={eachHabit.days.includes(2)}> T </WeekDays>
                        <WeekDays value="Q" name="3" atThisDay={eachHabit.days.includes(3)}> Q </WeekDays>
                        <WeekDays value="Q" name="4" atThisDay={eachHabit.days.includes(4)}> Q </WeekDays>
                        <WeekDays value="S" name="5" atThisDay={eachHabit.days.includes(5)}> S </WeekDays>
                        <WeekDays value="S" name="6" atThisDay={eachHabit.days.includes(6)}> S </WeekDays>
                    </section>
                </BoxHabit>
            )

        })
    )

}



const Main = styled.main`
    width: 100vw;
    padding: 70px 0px 120px 0px;
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


const WeekDays = styled.span`
    background-color: ${(props) => props.atThisDay === true ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #CFCFCF;
    border-radius: 5px;
    margin-right: 4px;
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
`

const BoxHabit = styled.div`
    width: 90%;
    padding: 12px;
    margin: 10px auto;

    background: #FFFFFF;
    border-radius: 5px;

    div{
        width: 100%;
        display: flex;
        justify-content: space-between;

        h2{
            padding: 8px 0px;
        }
    }
`