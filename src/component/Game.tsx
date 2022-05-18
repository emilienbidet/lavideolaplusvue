import {useCallback, useEffect, useMemo, useState} from "react";
import {TGameState, TVideo} from "../typings";
import {getRandomVideo} from "../utils/video";
import ScoreBar from "./ScoreBar";
import Video from "./Video";
import VideoContainer from "./VideoContainer";
import styled from "styled-components";
import MadeBy from "./MadeBy";

const Game = () => {
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(0);

    const [gameState, setGameState] = useState<TGameState>("vs");
    const [isCounting, setIsCounting] = useState<boolean>(false);
    const [isSlidingOut, setIsSlidingOut] = useState<boolean>(false);

    const [leftVideo, setLeftVideo] = useState<TVideo>(getRandomVideo());
    const [rightVideo, setRightVideo] = useState<TVideo>(getRandomVideo());
    const [nextVideo, setNextVideo] = useState<TVideo>(getRandomVideo());

    const [videoClicked, setVideoClicked] = useState<string>("right");

    const borderColor = useMemo(() => {
        return {
            vs: "transparent",
            lost: "#ff0000",
            won: "#00ff00",
        }[gameState];
    }, [gameState]);

    const updateScore = useCallback(() => {
        const hasWon =
            (videoClicked == "left" && leftVideo.viewCount >= rightVideo.viewCount) ||
            (videoClicked == "right" && rightVideo.viewCount >= leftVideo.viewCount);
        const newScore = hasWon ? score + 1 : 0;
        setGameState(hasWon ? "won" : "lost");
        setScore(newScore);
        setHighScore(Math.max(newScore, highScore));
    }, [leftVideo, rightVideo, score, videoClicked, highScore, setHighScore, setScore]);

    const handleClickRightVideo = useCallback(() => {
        setVideoClicked("right");
        setIsCounting(true);
    }, [setVideoClicked, setIsCounting]);

    const handleClickLeftVideo = useCallback(() => {
        setVideoClicked("left");
        setIsCounting(true);
    }, [setVideoClicked, setIsCounting]);

    const changeVideos = useCallback(() => {
        setLeftVideo(rightVideo);
        setRightVideo(nextVideo);
        setNextVideo(getRandomVideo());
        setGameState("vs");
        setIsSlidingOut(false);
    }, [
        rightVideo,
        nextVideo,
        setLeftVideo,
        setRightVideo,
        setNextVideo,
        setGameState,
        setIsSlidingOut,
    ]);

    const handleCountingEnd = useCallback(() => {
        updateScore();
        setIsSlidingOut(true);
    }, [setIsCounting, setIsSlidingOut, updateScore]);

    const handleSlidingOutEnd = useCallback(() => {
        setIsCounting(false);
        changeVideos();
    }, [setIsCounting, changeVideos]);

    useEffect(() => {
        setHighScore(parseInt(localStorage.getItem("highScore") || "0"));
        return () => {
            localStorage.setItem("highScore", highScore.toString());
        };
    }, []);

    return (
        <Container borderColor={borderColor}>
            <ScoreBar score={score} highScore={highScore} />
            <VideoContainer isSlidingOut={isSlidingOut} onAnimationEnd={handleSlidingOutEnd}>
                <Video initialState="views" video={leftVideo} onClick={handleClickLeftVideo} />
                <Video
                    initialState={isCounting ? "loading" : "empty"}
                    video={rightVideo}
                    onAnimationEnd={handleCountingEnd}
                    onClick={handleClickRightVideo}
                />
                <Video initialState="empty" video={nextVideo} />
            </VideoContainer>
            <MadeBy />
        </Container>
    );
};

type ContainerProps = {
    borderColor?: string;
};

const Container = styled.div<ContainerProps>`
    position: relative;
    border: 1rem solid ${({borderColor}) => borderColor || "transparent"};
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    overflow: hidden;
    flex-direction: column;

    @media screen and (min-width: 800px) {
        flex-direction: row;
    }
`;

export default Game;
