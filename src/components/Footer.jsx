import styled from "styled-components"

import Circle from "./Circle"

export default function Footer(props) {
    const { picture } = props

    return (
        <StyledHead>
            <span>Hábitos</span>
            
            <button> <Circle/> </button>
            <span>Histórico</span>
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
    }
`