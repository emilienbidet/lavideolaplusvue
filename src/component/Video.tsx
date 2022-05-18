import {useMemo} from "react";
import styled from "styled-components";
import Flex from "./Flex";
import CountUp from "react-countup";
import {TVideo} from "../typings";

type VideoCardState = "buttons" | "loading" | "views" | "empty";

type VideoCardProps = {
    video: TVideo;
    initialState: VideoCardState;
    onClick?: () => void;
    onAnimationEnd?: () => void;
};

const Video = ({video, initialState, onClick, onAnimationEnd}: VideoCardProps) => {
    const {title, channelTitle, viewCount, thumbnailUrl} = video;

    const formattedViews = useMemo(
        () => viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        [viewCount]
    );

    return (
        <Container backgroundUrl={thumbnailUrl} justifyContent={"center"} onClick={onClick}>
            <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <Flex flexDirection={"column"} marginBottom={4}>
                    <h1 style={{textAlign: "center", fontSize: "2rem", marginBottom: "1rem"}}>
                        {title}
                    </h1>
                    <h2 style={{textAlign: "center", fontSize: "1rem"}}>{channelTitle}</h2>
                </Flex>

                {initialState == "views" && (
                    <Flex flexDirection={"column"}>
                        <span style={{fontSize: "3rem", color: "#fff989", fontWeight: "bold"}}>
                            {formattedViews}
                        </span>
                        <p style={{fontSize: "1rem", textAlign: "center"}}>vues</p>
                    </Flex>
                )}

                {initialState == "loading" && (
                    <Flex flexDirection={"column"}>
                        <CountUp
                            end={viewCount}
                            duration={1.5}
                            separator=" "
                            delay={0}
                            onEnd={onAnimationEnd}
                        >
                            {({countUpRef}) => (
                                <span
                                    style={{
                                        fontSize: "3rem",
                                        color: "#fff989",
                                        fontWeight: "bold",
                                    }}
                                    ref={countUpRef}
                                />
                            )}
                        </CountUp>
                        <p style={{fontSize: "1rem", textAlign: "center"}}>vues</p>
                    </Flex>
                )}
            </Flex>
        </Container>
    );
};

type TContainerProps = {
    backgroundUrl: string;
};

const Container = styled(Flex)<TContainerProps>`
    flex: 1;
    padding: 2rem;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url("${(props) => props.backgroundUrl}");
`;

export default Video;
