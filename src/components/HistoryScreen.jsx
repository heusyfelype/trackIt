import Header from "./Header"
import Footer from "./Footer"
import styled from "styled-components"
import InfosLoginContext from "./InfosLoginContext"
import { useContext } from "react"



export default function HistoryScreen(){
    const {infosLogin} = useContext(InfosLoginContext)
    return(
        <>
            <Header picture={infosLogin.image}/>
                <Main>
                    <h2> Histórico </h2>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                </Main>
            <Footer/>
        </>
    )
}

const Main = styled.main`
    width: 100vw;
    padding: 70px 15px 120px 15px;
    min-height: 100vh;
    background-color: #F2F2F2;

    h2{
        font-size: 23px;
        color: #126BA5;
        padding: 15px 0px;
    }

    p{
        font-size: 18px;
        color: #666666;
    }
`