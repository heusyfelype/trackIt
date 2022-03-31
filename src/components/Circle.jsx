import styled from "styled-components"

export default function Circle() {

    return (
        <StyledCircle>
            <div className="single-chart">
                <svg viewBox="0 0 36 36" className="circular-chart green">
                    <path
                        className="circle-bg"
                        d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className="circle"
                        strokeDasharray="60, 100" // para alterar o progresso basta alterar essa 60
                        d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage"> Hoje </text>
                </svg>
            </div>
        </StyledCircle>
    )
}

const StyledCircle = styled.div`
      .single-chart {
        width: 100%;
        justify-content: space-around;
      } 

      .circular-chart {
        display: block;
        margin: 5px auto;
        max-width: 95%;
        max-height: 250px;
      }

      .circle-bg {
        fill: none;
      }

      .circle {
        fill: none;
        stroke-width: 2.8;
        stroke-linecap: round;
        animation: progress 1s ease-out forwards;
      }

      @keyframes progress {
        0% {
          stroke-dasharray: 0 100;
        }
      }

      .circular-chart.green .circle {
        stroke: #FFFFFF;
      }

      .percentage {
        fill: white;
        font-size: 0.5em;
        text-anchor: middle;
      }
` 