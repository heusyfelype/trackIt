import { useLocation } from "react-router-dom"
import styled from "styled-components"

import Header from "./Header"

export default function HabitsScreen(){

    const location = useLocation();
    console.log(location)

    return(
        <>
        <Header picture={location.state.image}/>
        <Main>

        </Main>
        {/* <Footer/> */}
        </>
    )
}

const Main = styled.main`
    
`