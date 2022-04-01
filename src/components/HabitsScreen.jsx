import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { useEffect, useState, useContext } from "react";
import axios from "axios";



import Header from "./Header"
import Footer from "./Footer";
import InfosLoginContext from "./InfosLoginContext";
import LoadingButton from "./LoadingButton";
import LoadingContext from "./LoadingContext";



export default function HabitsScreen() {
    const { infosLogin } = useContext(InfosLoginContext);
    const [userHabitsList, setUserHabitsList] = useState({ data: [] })

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
                <div>
                    <CreateHabit setUserHabitsList={setUserHabitsList} userHabitsList={userHabitsList} />
                    {userHabitsList.data.length === 0 ? <p> Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear! </p> : <ListHabits userHabitsList={userHabitsList} setUserHabitsList={setUserHabitsList} />}
                </div>
            </Main>
            <Footer />
        </>
    )
}


function CreateHabit(props) {
    const { infosLogin } = useContext(InfosLoginContext);
    const { setLoadingState } = useContext(LoadingContext)


    const { setUserHabitsList, userHabitsList } = props;
    const [infosToCreateAHabit, setInfosToCreateAHabit] = useState({
        name: "",
        days: []
    })
    // **********************
    const [isCreateHabitClicked, setIsCreateHabitClicked] = useState(false);
    function toggleCreateHabit() {
        isCreateHabitClicked ? setIsCreateHabitClicked(false) : setIsCreateHabitClicked(true);
    }
    // **********************

    const [isUnavailable, setIsUnavaiable] = useState(false)

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
        setIsUnavaiable(true)
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", infosToCreateAHabit, config)
        request.then(response => { setUserHabitsList({ ...userHabitsList, data: [...userHabitsList.data, response.data] }); toggleCreateHabit(); setIsUnavaiable(false); setLoadingState(["Atualizar"]) })
        request.catch(response => { alert("Algo deu errado" + response); setIsUnavaiable(false); setLoadingState(["Atualizar"]) })

        setInfosToCreateAHabit({ name: "", days: [] })
    }

    return <>
        <nav>
            <h2>Meus Hábitos</h2>
            <button onClick={() => { toggleCreateHabit() }}> + </button>
        </nav>

        {isCreateHabitClicked ? (
            <BoxCrateHabit>
                <form onSubmit={PostANewHabit} >
                    <input type="text" placeholder="nome do hábito" value={infosToCreateAHabit.name} onChange={e => { setInfosToCreateAHabit({ ...infosToCreateAHabit, name: e.target.value }) }} />
                    <section>
                        <InputDayCreateAHabit dayClicked={{dayClicked:0, arrDays: infosToCreateAHabit.days} } disabled={isUnavailable} type="button" value="D" name="0" onClick={e => { setDays(parseInt(e.target.name)) }} />
                        <InputDayCreateAHabit dayClicked={{dayClicked:1, arrDays: infosToCreateAHabit.days} } disabled={isUnavailable} type="button" value="S" name="1" onClick={e => { setDays(parseInt(e.target.name)) }} />
                        <InputDayCreateAHabit dayClicked={{dayClicked:2, arrDays: infosToCreateAHabit.days} } disabled={isUnavailable} type="button" value="T" name="2" onClick={e => { setDays(parseInt(e.target.name)) }} />
                        <InputDayCreateAHabit dayClicked={{dayClicked:3, arrDays: infosToCreateAHabit.days} } disabled={isUnavailable} type="button" value="Q" name="3" onClick={e => { setDays(parseInt(e.target.name)) }} />
                        <InputDayCreateAHabit dayClicked={{dayClicked:4, arrDays: infosToCreateAHabit.days} } disabled={isUnavailable} type="button" value="Q" name="4" onClick={e => { setDays(parseInt(e.target.name)) }} />
                        <InputDayCreateAHabit dayClicked={{dayClicked:5, arrDays: infosToCreateAHabit.days} } disabled={isUnavailable} type="button" value="S" name="5" onClick={e => { setDays(parseInt(e.target.name)) }} />
                        <InputDayCreateAHabit dayClicked={{dayClicked:6, arrDays: infosToCreateAHabit.days} } disabled={isUnavailable} type="button" value="S" name="6" onClick={e => { setDays(parseInt(e.target.name)) }} />
                    </section>
                    <div>
                        <button disabled={isUnavailable} onClick={() => { toggleCreateHabit() }}>Cacelar</button>
                        <button disabled={isUnavailable} type="submit">{isUnavailable ? <LoadingButton /> : "Salvar"}</button>
                    </div>
                </form>
            </BoxCrateHabit>
        ) : ""}
    </>



}


function ListHabits(props) {
    const { userHabitsList, setUserHabitsList } = props;
    const { setLoadingState } = useContext(LoadingContext)

    const { infosLogin } = useContext(InfosLoginContext);
    const config = {
        headers: {
            Authorization: `Bearer ${infosLogin.token}`
        }
    }


    return (
        userHabitsList.data.map((eachHabit) => {
            return (
                <BoxHabit key={JSON.stringify(eachHabit)}>
                    <div> <h2>{eachHabit.name}</h2> <span onClick={() => { DeleteHabit(eachHabit.id, config, setUserHabitsList, setLoadingState) }}><ion-icon name="trash-outline"></ion-icon></span></div>

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


function DeleteHabit(id, config, setUserHabitsList, setLoadingState) {
    const confirmation = window.confirm("Você realmente deseja excluir este hábito?")
    if (confirmation === true) {
        const res = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
        res.then(() => {
            const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
            request.then(response => {
                const { data } = response;
                setUserHabitsList({ data });
                setLoadingState(["Att"])
            })
            request.catch(response => alert(response))
        })
    }

}



const Main = styled.main`
    width: 100vw;
    padding: 70px 0px 120px 0px;
    min-height: 100vh;
    background-color: #F2F2F2;

    & > div{
        margin: 0 auto;
        width: 90%;
        max-width: 600px;
    }

    p{
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        padding-top: 25px ;
    }

    nav {
        width: 100%;
        padding: 20px 0px;
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

const InputDayCreateAHabit = styled.input`
        width: 30px;
        height: 30px;
        margin-right: 4px;
        background-color: ${(props) => props.dayClicked.arrDays.includes(props.dayClicked.dayClicked) ? "#CFCFCF" : "#FFFFFF"};
        color: ${(props) => props.dayClicked.arrDays.includes(props.dayClicked.dayClicked) ? "#FFFFFF" : "#CFCFCF"};;
        border: 1px solid #CFCFCF;
        border-radius: 5px;
        cursor: pointer;
`

const WeekDays = styled.span`
    background-color: ${(props) => props.atThisDay === true ? "#CFCFCF" : "#FFFFFF"};
    color: ${(props) => props.atThisDay === true ? "#FFFFFF" : "#CFCFCF"};
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
    width: 100%;
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
            color: #666666;
        }
    }
`

const BoxCrateHabit = styled.section`
    width: 100%;
    padding: 18px;
    background: #FFFFFF;
    border-radius: 5px;
    

    & form > input{
        
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


    & form div{
        width: 100%;
        display: flex;
        justify-content: right;
    }


    & form div button:nth-child(1){
        background-color: #FFFFFF;
        color: #52B6FF;
        font-size: 15.976px;
        width: 84px;
        height: 35px;
        border: none;
        border-radius: 5px;
        margin-top: 30px;
    }
    & form div button:nth-child(2){
        background-color: #52B6FF;
        color: #FFFFFF;
        font-size: 15.976px;
        width: 84px;
        height: 35px;
        border: none;
        border-radius: 5px;
        margin-top: 30px;
        cursor: pointer;
    }
`