import styled from "styled-components";
import Flex from "./Flex";

type ScoreBarProps = {
    score: number;
    highScore: number;
};

const ScoreBar = ({highScore, score}: ScoreBarProps) => {
    return (
        <Container>
            <ScoreText>Best : {highScore}</ScoreText>
            <ScoreText>Score : {score}</ScoreText>
        </Container>
    );
};

const Container = styled(Flex)`
    position: absolute;
    top: 10px;
    z-index: 1;
    width: 100%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const ScoreText = styled.span`
    font-size: 1rem;

    @media screen and (min-width: 800px) {
        font-size: 20px;
    }
`;

export default ScoreBar;
