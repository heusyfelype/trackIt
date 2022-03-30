import { useLocation } from "react-router-dom"
import styled from "styled-components"

import Header from "./Header"
import Footer from "./Footer";

export default function HabitsScreen(){

    const location = useLocation();
    console.log(location)

    return(
        <>
        <Header picture={location.state.image}/>
        <Main>

        </Main>
        <Footer/> 
        </>
    )
}

const Main = styled.main`
    padding: 70px 0px;
    min-height: 100vh;
    background-color: #F2F2F2;
`