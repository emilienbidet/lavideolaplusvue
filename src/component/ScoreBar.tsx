import styled from "styled-components";
import Flex from "./Flex";

type ScoreBarProps = {
    score: number;
    highScore: number;
};

const ScoreBar = ({highScore, score}: ScoreBarProps) => {
    return (
        <Container justifyContent={"space-between"}>
            <ScoreText>Meilleur score : {highScore}</ScoreText>
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
`;

const ScoreText = styled.span`
    font-size: 16px;
    font-style: bold;
    font-weight: 700;

    @media screen and (min-width: 600px) {
        font-size: 18px;
    }
    @media screen and (min-width: 800px) {
        font-size: 20px;
    }
    @media screen and (min-width: 1200px) {
        font-size: 22px;
    }
`;

export default ScoreBar;
