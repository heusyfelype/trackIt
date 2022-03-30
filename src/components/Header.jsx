import styled from "styled-components"

export default function Header(props) {
    const { picture } = props

    return (
        <StyledHead>
            <span>TrackIt</span>
            <img src={picture} alt="" />
        </StyledHead>
    )
}

const StyledHead = styled.nav`
    width: 100vw;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    color: white;
    padding: 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: 'Playball';
    font-size: 38.982px;

    position: fixed;
    left: 0px;
    top: 0px;

    img{
        height: 70%;
        width: auto;
        overflow: auto;
        border-radius: 50%;
    }
`